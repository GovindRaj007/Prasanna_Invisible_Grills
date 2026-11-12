import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: isSsrBuild
    ? {
        // Build-time only bundle used by scripts/prerender.mjs
        outDir: "dist-server",
        emptyOutDir: true,
        minify: false,
        sourcemap: false,
      }
    : {
        outDir: "dist",
        assetsDir: "assets",
        sourcemap: false,
        minify: "terser",
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
        rollupOptions: {
          output: {
            // Only the framework is pinned to a long-lived vendor chunk; everything else is
            // split per route by Rollup so pages don't download components they don't use.
            manualChunks: {
              vendor: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
            },
          },
        },
        reportCompressedSize: false,
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 1000,
      },
  ssr: {
    // CommonJS packages that need bundling for Node ESM named imports during prerender
    noExternal: ["react-helmet-async"],
  },
  css: {
    postcss: "./postcss.config.js",
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
}));
