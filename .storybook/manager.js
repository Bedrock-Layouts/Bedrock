// .storybook/manager.js

import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Bedrock Layout Primitives",
    brandUrl: "/",
    brandImage:
      "https://user-images.githubusercontent.com/5460770/77477816-8df68000-6de2-11ea-83be-9f12c8de7f0d.png",
    textColor: "#161e2e",
  }),
});
