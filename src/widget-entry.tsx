/**
 * WIDGET ENTRY POINT
 * 
 * This file is the entry point for building the IIFE bundle.
 * It imports the init function which auto-registers on window.
 * 
 * After GitHub export, use this entry point with Vite library mode:
 * 
 * vite.config.widget.ts:
 * ```
 * build: {
 *   lib: {
 *     entry: 'src/widget-entry.tsx',
 *     name: 'PricingWidget',
 *     formats: ['iife'],
 *     fileName: () => 'pricing-widget.iife.js'
 *   },
 *   rollupOptions: {
 *     output: {
 *       inlineDynamicImports: true
 *     }
 *   }
 * }
 * ```
 */

import "./widget-init";

// This file just imports the init module which registers window.initPricingCalculator
