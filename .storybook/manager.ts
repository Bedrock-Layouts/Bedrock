// .storybook/manager.js
import "open-props/open-props.min.css";

import "./manager-styles.css";

import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";
import openProps from "open-props";

addons.setConfig({
  showToolbar: false,
  theme: create({
    base: "dark",
    brandTitle: "Bedrock Layout Primitives",
    brandUrl: "/",
    brandImage: "/Logo only.png",
    fontBase: '"Roboto", sans-serif',
    textColor: openProps.gray2,
  }),
});
