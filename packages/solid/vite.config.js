import path from "path";

import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
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
      external: ["solid-js", "@bedrock-layout/spacing-constants", "open-props"],
    },
  },
});
