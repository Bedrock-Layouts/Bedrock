/* eslint-disable @typescript-eslint/no-var-requires */
// vite.config.js
const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    outDir: "./lib",
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "masonry-grid",
      formats: ["cjs", "umd", "es"],
      fileName: (format) => {
        return `index.${format === "es" ? "m" : format}.js`;
      },
    },
    rollupOptions: {
      external: [
        "react",
        "@bedrock-layout/spacing-constants",
        "@bedrock-layout/type-utils",
        "@bedrock-layout/grid",
        "@bedrock-layout/use-resize-observer",
      ],
    },
  },
});
