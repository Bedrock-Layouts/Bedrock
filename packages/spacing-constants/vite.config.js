/* eslint-disable @typescript-eslint/no-var-requires */
// vite.config.js
const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    outDir: "./lib",
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "spacing-constants",
      formats: ["cjs", "umd", "es"],
      fileName: (format) => {
        return `index.${format === "es" ? "m" : format}.js`;
      },
    },
    rollupOptions: {
      external: ["react", "open-props"],
    },
  },
});
