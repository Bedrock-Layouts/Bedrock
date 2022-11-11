module.exports = {
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("cssnano")({
      preset: "default",
    }),
  ],
};
