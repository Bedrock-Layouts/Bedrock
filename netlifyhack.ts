import fs from "fs";
import path from "path";
import { promisify } from "util";

const storybookStatic = path.join(__dirname, "storybook-static");
const sbAddons = path.join(storybookStatic, "sb-addons");
const hiddenStorybook = path.join(sbAddons, ".storybook");
const nonHiddenStorybook = path.join(sbAddons, "storybook");
(async () => {
  await promisify(fs.rename)(hiddenStorybook, nonHiddenStorybook);
})();
