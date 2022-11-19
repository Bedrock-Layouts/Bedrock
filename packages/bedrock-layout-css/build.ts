import fs from "fs";
import path from "path";
import { promisify } from "util";

import concat from "concat";

const libPath = path.join(__dirname, "lib");
const libComponentPath = path.join(libPath, "components");
const srcPath = path.join(__dirname, "src");
const srcComponentPath = path.join(srcPath, "components");

const removeDir = promisify(fs.rmdir);
const writeFile = promisify(fs.writeFile);
const makeDir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const readDir = promisify(fs.readdir);

(async () => {
  await removeDir(libPath, { recursive: true }).catch(() => void 0);
  await makeDir(libPath);
  await makeDir(libComponentPath);

  const files = await readDir(srcComponentPath);

  const filesSorted = Array.from(
    new Set(["spacing-properties.css", "reset.css", ...files])
  );

  const result = await concat(
    filesSorted.map((file) => path.join(srcComponentPath, file))
  );

  assertIsString(result);

  await writeFile(path.join(libPath, "bedrock-layout.css"), result);

  await Promise.all(
    filesSorted.map(async (file) => {
      console.info(`Copying ${file}`);
      copyFile(
        path.join(srcComponentPath, file),
        path.join(libComponentPath, file)
      );
    })
  );
})();

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Expected a string");
  }
}
