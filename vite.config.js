import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' 
      }
    }
  },
  plugins: [
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;

        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
    react({
      babel: {
        plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
      },
    }),
    svgrPlugin(),
    tsconfigPaths(),
  ],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      apollo: "/src/apollo",
      assets: "/src/assets",
      aws: "/src/aws",
      components: "/src/components",
      constants: "/src/constants",
      context: "/src/context",
      "app-graphql": "/src/graphql",
      guards: "/src/guards",
      hooks: "/src/hooks",
      layouts: "/src/layouts",
      middlewares: "/src/middlewares",
      pages: "/src/pages",
      routes: "/src/routes",
      services: "/src/services",
      store: "/src/store",
      styles: "/src/styles",
      types: "/src/types",
      utils: "/src/utils",
    },
  },

  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
