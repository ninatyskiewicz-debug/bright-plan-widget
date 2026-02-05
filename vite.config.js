import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/widget-entry.jsx",
      name: "PricingWidget",
      formats: ["iife"],
      fileName: () => "pricing-widget.iife.js",
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
});
