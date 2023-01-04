import fs from "fs";
import path from "path";
import { promisify } from "util";

const storybookStatic = path.join(__dirname, "storybook-static");
const sbAddons = path.join(storybookStatic, "sb-addons");
const hiddenStorybook = path.join(sbAddons, ".storybook");
const nonHiddenStorybook = path.join(sbAddons, "storybook");
(async () => {
  try {
    await promisify(fs.rename)(hiddenStorybook, nonHiddenStorybook);
    const files = await promisify(fs.readdir)(sbAddons);
    if (!files.includes("storybook")) {
      throw new Error("Failed to rename .storybook to storybook");
    }
    // eslint-disable-next-line no-console
    console.log("Renamed .storybook to storybook");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
})();
