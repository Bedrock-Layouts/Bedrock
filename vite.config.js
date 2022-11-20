/// <reference types="vitest" />
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRefresh()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTest.js"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/lib/**",
    ],
    coverage: {
      reporter: ["text", "json", "html"],
      statements: 95,
      branches: 96,
      functions: 97,
      lines: 95,
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/cypress/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/lib/**",
        "**/__tests__/**",
      ],
    },
  },
});
