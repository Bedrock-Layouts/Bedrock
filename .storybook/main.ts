import { dirname, join } from "path";
const turbosnap = require("vite-plugin-turbosnap");

import type { InlineConfig } from "vite";

export const stories = [
  "./pages/Landing.stories.mdx",
  "./pages/introduction.stories.mdx",
  "./pages/installation.stories.mdx",
  "./pages/stack.stories.mdx",
  "./pages/spacing.stories.mdx",
  "./pages/menu.stories.mdx",
  "./pages/hero.stories.mdx",
  "./pages/new-arrivals.stories.mdx",
  "../stories/**/*.stories.@(js|ts|tsx|mdx)",
  "./pages/contributing.stories.mdx",
  "../examples/examples.stories.mdx",
  "../examples/web.dev.stories.mdx",
];
export const addons = [
  getAbsolutePath("@storybook/addon-essentials"),
  getAbsolutePath("@chromaui/addon-visual-tests"),
];

export const staticDirs = ["../public"];

export const features = {
  storyStoreV7: true,
};

export const viteFinal = async (config: InlineConfig, { configType }) => {
  // Turbosnap is only useful when building for production
  if (configType === "PRODUCTION") {
    config.plugins?.push(
      turbosnap({
        rootDir: config.root,
      }),
    );
  }
  return config;
};

export const framework = {
  name: getAbsolutePath("@storybook/react-vite"),
  options: {},
};

export const docs = {
  autodocs: true,
  toc: true,
};

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}
