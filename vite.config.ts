import path from "node:path";
import { defineConfig } from "vite";

const fetchVersion = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return html.replace(
        /__APP_VERSION__/,
        `v${process.env.npm_package_version}`
      );
    },
  };
};

export default defineConfig({
  plugins: [fetchVersion()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: new URL("./popup/index.html", import.meta.url).pathname,
        background: new URL("./background/index.html", import.meta.url)
          .pathname,
      },
      output: {
        entryFileNames: "[name]/[name].js",
      },
    },
  },
});
