import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

import concat from "concat";

const libPath = path.join(__dirname, "lib");
const libComponentPath = path.join(libPath, "components");
const srcPath = path.join(__dirname, "src");
const srcComponentPath = path.join(srcPath, "components");

const removeDir = promisify(fs.rm);
const writeFile = promisify(fs.writeFile);
const makeDir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const readDir = promisify(fs.readdir);

(async () => {
  await removeDir(libPath, { recursive: true, force: true }).catch(
    () => void 0,
  );
  await makeDir(libPath);
  await makeDir(libComponentPath);

  const files = await readDir(srcComponentPath);

  const filesSorted = Array.from(new Set([...files]));

  const bedrockLayoutCSS = await concat(
    filesSorted.map((file) => path.join(srcComponentPath, file)),
  );

  assertIsString(bedrockLayoutCSS);

  await writeFile(path.join(libPath, "bedrock-layout.css"), bedrockLayoutCSS);

  await Promise.all(
    filesSorted.map(async (file) => {
      // eslint-disable-next-line no-console
      console.info(`Copying ${file}`);
      copyFile(
        path.join(srcComponentPath, file),
        path.join(libComponentPath, file),
      );
    }),
  );

  await Promise.all(
    filesSorted.map(async (file) => {
      // eslint-disable-next-line no-console
      console.info(`Minifying ${file}`);
      exec(
        `npx postcss ${path.join(libComponentPath, file)} > ${path.join(
          libComponentPath,
          file.replace(".css", ".min.css"),
        )}`,
      );
    }),
  );

  copyFile(path.join(srcPath, "reset.css"), path.join(libPath, "reset.css"));

  exec("npx postcss ./lib/bedrock-layout.css > ./lib/bedrock-layout.min.css");
  exec("npx postcss ./lib/reset.css > ./lib/reset.min.css");
})();

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Expected a string");
  }
}

//&& npx postcss ./lib/bedrock-layout.css > ./lib/bedrock-layout.min.css
