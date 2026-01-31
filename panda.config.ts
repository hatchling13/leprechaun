import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // Match up with path alias
  importMap: "@panda",

  // The output directory for your css system
  outdir: "styled-system",

  globalCss: {
    html: {
      blockSize: "full",
    },
    body: {
      blockSize: "full",
      display: "grid",
      gridTemplateRows: "1fr",
    },
  },
});
