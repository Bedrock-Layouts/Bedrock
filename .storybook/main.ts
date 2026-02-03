import { dirname, join } from "path";

import type { InlineConfig } from "vite";

const turbosnap = require("vite-plugin-turbosnap");

export const stories = [
  "./pages/Landing.mdx",
  "./pages/introduction.mdx",
  "./pages/installation.mdx",
  "./pages/stack.mdx",
  "./pages/spacing.mdx",
  "./pages/menu.mdx",
  "./pages/hero.mdx",
  "./pages/new-arrivals.mdx",
  "./pages/migration-guide.mdx",
  "../stories/**/*.@(mdx|stories.@(js|ts|tsx))",
  "./pages/contributing.mdx",
  "./pages/roadmap.mdx",
  "../examples/examples.mdx",
  "../examples/web.dev.mdx",
];
export const addons = [
  getAbsolutePath("@storybook/addon-essentials"),
  getAbsolutePath("@chromaui/addon-visual-tests"),
  getAbsolutePath("@storybook/addon-mdx-gfm"),
];

export const staticDirs = ["../public"];

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
