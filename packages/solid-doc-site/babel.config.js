module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "solid",
    "@babel/preset-typescript",
  ],
};
