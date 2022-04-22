const turbosnap = require("vite-plugin-turbosnap");

import type { Options } from "@storybook/core-common";
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
  "../packages/**/examples/*.stories.@(js|ts|tsx|mdx)",
  "./pages/contributing.stories.mdx",
  "../examples/examples.stories.mdx",
  "../examples/web.dev.stories.mdx",
];

export const addons = ["@storybook/addon-essentials"];

export const framework = "@storybook/react";

export const core = { builder: "@storybook/builder-vite" };

export const staticDirs = ["../public"];

export const features = {
  storyStoreV7: true,
};

export const viteFinal = async (
  config: InlineConfig,
  { configType }: Options
) => {
  // Turbosnap is only useful when building for production
  if (configType === "PRODUCTION") {
    config.plugins?.push(turbosnap({ rootDir: config.root }));
  }
  return config;
};
