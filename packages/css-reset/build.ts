import fs from "fs";
import path from "path";
import { promisify } from "util";

const libPath = path.join(__dirname, "lib");
const resetPath = path.join(__dirname, "../bedrock-layout-css/src/components");

const copyFile = promisify(fs.copyFile);

(async () => {
  // eslint-disable-next-line no-console
  console.info(`Copying reset.css`);
  copyFile(path.join(resetPath, "reset.css"), path.join(libPath, "reset.css"));
})();
