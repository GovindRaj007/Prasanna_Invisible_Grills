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
        // Manual chunk splitting for optimal loading
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-avatar', '@radix-ui/react-checkbox', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-label', '@radix-ui/react-popover', '@radix-ui/react-tabs', '@radix-ui/react-tooltip'],
          'analytics': ['react-helmet-async'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'charts': ['recharts'],
          'utils': ['clsx', 'tailwind-merge', 'date-fns']
        }
      },
    },
    // Core Web Vitals optimization
    reportCompressedSize: false, // Speed up build
    // Optimize images in the bundle
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    chunkSizeWarningLimit: 1000,
    // Split chunks to improve cache busting
    commonjsOptions: {
      include: /node_modules/,
    },
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
