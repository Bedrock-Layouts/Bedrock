// .storybook/manager.js

import "./manager-styles.css";

import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Bedrock Layout Primitives",
    brandUrl: "/",
    brandImage: "/Full logo.png",
    textColor: "#161e2e",
    fontBase: '"Roboto", sans-serif',
    appBg: "white",
    appBorderColor: "white",
  }),
  toolbar: {
    title: { hidden: true },
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
  },
});
