import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development"].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Production build optimization
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false, // Disable source maps in production for security
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Optimize chunk splitting for better caching and LCP
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "@tanstack/react-query", "react-helmet-async"],
          ui: ["@radix-ui/react-accordion", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-label", "@radix-ui/react-popover", "@radix-ui/react-select", "@radix-ui/react-slot", "@radix-ui/react-tabs", "@radix-ui/react-toast", "sonner", "cmdk"],
        },
      },
    },
    // Core Web Vitals optimization
    reportCompressedSize: false, // Speed up build
    // Optimize images in the bundle
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    chunkSizeWarningLimit: 1000,
  },
  
  // Optimize CSS
  css: {
    preprocessorOptions: {
      // Pre-processor options for CSS optimization
    },
    postcss: "./postcss.config.js",
  },
  
  // Enable gzip compression metadata (for server configuration)
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
}));
