/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "src/stack.css");
const lib = path.join(__dirname, "lib/stack.css");

fs.copyFile(source, lib, (error) => {
  if (error) {
    console.error(error);
  }
});
