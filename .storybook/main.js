const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const webpack = require("webpack");

module.exports = {
  stories: [
    "./pages/Landing.stories.mdx",
    "./pages/inspiration.stories.mdx",
    "./pages/regardingIE11.stories.mdx",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
  ],
  webpackFinal: async (config) => {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              transpileOnly: true,
            },
          },
          {
            loader: "react-docgen-typescript-loader",
            options: {},
          },
        ],
      },
    ];
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve.alias || {}),
      },
      extensions: [...(config.resolve.extensions || []), ".ts", ".tsx"],
      plugins: [new TsConfigPathsPlugin({})],
    };
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV === "development",
      }),
    ];
    return config;
  },
};
