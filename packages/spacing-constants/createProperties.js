/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const { sizes, spacing } = require("./lib/index.js");

const lib = path.join(__dirname, "lib/spacing-properties.css");

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

fs.writeFileSync(lib, rootVars);
