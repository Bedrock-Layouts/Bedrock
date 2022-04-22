// .storybook/manager.js
import "open-props/open-props.min.css";

import "./manager-styles.css";

import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";
import openProps from "open-props";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Bedrock Layout Primitives",
    brandUrl: "/",
    brandImage: "/Logo only.png",
    textColor: openProps.gray9,
    fontBase: '"Roboto", sans-serif',
    appBorderColor: openProps.gray9,
    appBg: "white",
  }),
  isToolshown: false,
});
