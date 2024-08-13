import { defineConfig } from "tsup";

export default defineConfig({
  platform: "browser",
  format: "iife",
  outExtension: ({ format }) => {
    return {
      js: ".js",
    };
  },
  entry: ["src/*"],
  dts: {
    resolve: true,
  },
  minify: true,
  clean: true,
  sourcemap: true,
  target: ["firefox129", "chrome127"],
  injectStyle: true,
  bundle: true,
  skipNodeModulesBundle: true,
  splitting: true,
  outDir: "dist",
  publicDir: "public",
  noExternal: ["webextension-polyfill", "@mozilla/readability", "turndown"],
});
