import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    viteReact(),
  ],
  build: {
    target: "esnext",
  },
  assetsInclude: ["**/*.wasm"],
  server: {
    fs: {
      allow: [".."],
    },
  },
});
