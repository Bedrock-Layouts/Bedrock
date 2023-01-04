import fs from "fs";
import path from "path";
import { promisify } from "util";

const storybookStatic = path.join(__dirname, "storybook-static");
const sbAddons = path.join(storybookStatic, "sb-addons");
const hiddenStorybook = path.join(sbAddons, ".storybook");
const nonHiddenStorybook = path.join(sbAddons, "storybook");

const netlifyToml = path.join(__dirname, "netlify.toml");

(async () => {
  try {
    await promisify(fs.mkdir)(nonHiddenStorybook);
    const hiddenStorybookFiles = await promisify(fs.readdir)(hiddenStorybook);

    await Promise.all(
      hiddenStorybookFiles.map(async (file) => {
        const from = path.join(hiddenStorybook, file);
        const to = path.join(nonHiddenStorybook, file);
        await promisify(fs.copyFile)(from, to);
      })
    );

    const files = await promisify(fs.readdir)(sbAddons);
    if (!files.includes("storybook")) {
      throw new Error("Failed to rename .storybook to storybook");
    }

    const storybookFiles = await promisify(fs.readdir)(nonHiddenStorybook);
    const baseToml = `[[redirects]]
force = true
from = "/src-components-use-forwarded-ref"
status = 301
to = "/?path=/docs/hooks-useforwardedref--docs"
`;
    const tomlContent = storybookFiles.reduce((base, file) => {
      return `${base}
[[redirects]]
force = true
from = "/sb-addons/.storybook/${file}"
status = 301
to = "/sb-addons/storybook/${file}"
`;
    }, baseToml);

    await promisify(fs.writeFile)(netlifyToml, tomlContent);
    // eslint-disable-next-line no-console
    console.log("Renamed .storybook to storybook");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
})();
