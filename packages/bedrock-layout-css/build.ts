import fs from "fs";
import path from "path";
import { promisify } from "util";

import { sizes, spacing } from "@bedrock-layout/spacing-constants";
import concat from "concat";

const libPath = path.join(__dirname, "lib");
const libComponentPath = path.join(libPath, "components");
const srcPath = path.join(__dirname, "src");
const srcComponentPath = path.join(srcPath, "components");

const spaceVars = Object.entries(spacing).reduce(
  (state, [key, val]) => `${state}
  --space-${key}: ${val};`,
  ""
);

const sizeVars = Object.entries(sizes).reduce(
  (state, [key, val]) => `${state}
  --size-${key}: ${val};`,
  ""
);

const rootVars = `:root{${spaceVars}${sizeVars}
}`;

const removeDir = promisify(fs.rmdir);
const writeFile = promisify(fs.writeFile);
const makeDir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const readDir = promisify(fs.readdir);

(async () => {
  await removeDir(libPath, { recursive: true }).catch(() => void 0);
  await makeDir(libPath);
  await makeDir(libComponentPath);

  await writeFile(
    path.join(srcComponentPath, "spacing-properties.css"),
    rootVars
  );

  const result = await concat([
    path.join(srcComponentPath, "spacing-properties.css"),
    path.join(srcComponentPath, "reset.css"),
    path.join(srcComponentPath, "stack.css"),
  ]);
  assertIsString(result);
  await writeFile(path.join(srcPath, "bedrock-layout.css"), result);

  const files = await readDir(srcComponentPath);
  await Promise.all(
    files.map(async (file) => {
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
