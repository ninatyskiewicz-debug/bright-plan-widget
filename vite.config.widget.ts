import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * WIDGET BUILD CONFIGURATION
 * 
 * Use this config AFTER exporting to GitHub to build the IIFE bundle:
 * 
 *   npx vite build --config vite.config.widget.ts
 * 
 * Output: dist/pricing-widget.iife.js
 * 
 * This bundles React + ReactDOM into a single file with window.initPricingCalculator
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/widget-entry.tsx"),
      name: "PricingWidget",
      formats: ["iife"],
      fileName: () => "pricing-widget.iife.js",
    },
    rollupOptions: {
      // Bundle everything (React, ReactDOM) into single file
      output: {
        inlineDynamicImports: true,
        // Ensure global is set correctly
        extend: true,
      },
    },
    // Single output file
    cssCodeSplit: false,
    // Minify for production
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for debugging
      },
    },
  },
});
