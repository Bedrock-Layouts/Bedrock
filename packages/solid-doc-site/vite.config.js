import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

module.exports = defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
