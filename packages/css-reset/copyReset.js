/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "src/reset.css");
const lib = path.join(__dirname, "lib/reset.css");

fs.copyFile(source, lib, (error) => {
  if (error) {
    console.error(error);
  }
});
