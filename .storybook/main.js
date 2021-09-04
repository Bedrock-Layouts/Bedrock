module.exports = {
  stories: [
    "./pages/Landing.stories.mdx",
    "./pages/installation.stories.mdx",
    "../packages/**/examples/*.stories.(js|ts|tsx|mdx)",
    "./pages/inspiration.stories.mdx",
    "./pages/contributing.stories.mdx",
    "../examples/examples.stories.mdx",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
  ],
};
