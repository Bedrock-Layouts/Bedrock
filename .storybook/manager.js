// .storybook/manager.js

import "./manager-styles.css";

import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Bedrock Layout Primitives",
    brandUrl: "/",
    brandImage:
      "https://user-images.githubusercontent.com/5460770/151467002-7da5559f-0cf6-424f-bd61-4fb5ea7fff2d.png",
    textColor: "#161e2e",
    fontBase: '"Roboto", sans-serif',
    appBg: "white",
    appBorderColor: "white",
  }),
});
