import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/*"],
  dts: {
    resolve: true,
  },
  minify: true,
  clean: true,
  sourcemap: true,
  target: "es2019",
  bundle: true,
  skipNodeModulesBundle: true,
  splitting: true,
  outDir: "dist",
  publicDir: "public",
  noExternal: ["@mozilla/readability", "turndown"],
});
