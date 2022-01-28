// .storybook/manager.js

import "./manager-styles.css";

import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Bedrock Layout Primitives",
    brandUrl: "/",
    brandImage: "/static/media/.storybook/assets/Full logo.png",
    textColor: "#161e2e",
    fontBase: '"Roboto", sans-serif',
    appBg: "white",
    appBorderColor: "white",
  }),
});
