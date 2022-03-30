import type { Configuration } from "webpack";

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

export const core = { builder: "webpack5" };

export const staticDirs = ["../public"];
