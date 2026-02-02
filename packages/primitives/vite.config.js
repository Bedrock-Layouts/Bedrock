/* eslint-disable @typescript-eslint/no-var-requires */
// vite.config.js
const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    outDir: "./lib",
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "solid",
      formats: ["cjs", "umd", "es"],
      fileName: (format) => {
        return `index.${format === "es" ? "m" : format}.js`;
      },
    },
    rollupOptions: {
      external: [
        "react",
        "@bedrock-layout/center",
        "@bedrock-layout/column-drop",
        "@bedrock-layout/columns",
        "@bedrock-layout/cover",
        "@bedrock-layout/frame",
        "@bedrock-layout/grid",
        "@bedrock-layout/inline",
        "@bedrock-layout/inline-cluster",
        "@bedrock-layout/reel",
        "@bedrock-layout/spacing-constants",
        "@bedrock-layout/split",
        "@bedrock-layout/stack",
        "@bedrock-layout/type-utils",
        "@bedrock-layout/use-container-query",
        "@bedrock-layout/use-forwarded-ref",
        "@bedrock-layout/use-resize-observer",
        "@bedrock-layout/use-stateful-ref",
      ],
    },
  },
});
