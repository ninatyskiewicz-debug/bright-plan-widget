import { createRoot } from "react-dom/client";
import PricingWidget from "./components/PricingWidget";

/**
 * Widget initialization configuration
 */
interface WidgetConfig {
  mountId: string;
  calcVersion?: string;
}

/**
 * Initialize and mount the pricing calculator widget.
 * This function is exposed globally for IIFE bundle usage.
 * 
 * Usage in Webflow/HTML:
 * <div id="pricing-calculator-root"></div>
 * <script src="pricing-widget.iife.js"></script>
 * <script>
 *   window.initPricingCalculator({ mountId: "pricing-calculator-root" });
 * </script>
 */
function initPricingCalculator(config: WidgetConfig): void {
  const { mountId, calcVersion } = config;

  const container = document.getElementById(mountId);

  if (!container) {
    console.error(
      `[PricingWidget] Mount element not found: #${mountId}. ` +
        `Make sure <div id="${mountId}"></div> exists in the DOM.`
    );
    return;
  }

  try {
    const root = createRoot(container);
    root.render(<PricingWidget calcVersion={calcVersion} />);
    console.log(`[PricingWidget] Mounted successfully to #${mountId}`);
  } catch (error) {
    console.error("[PricingWidget] Failed to mount:", error);
  }
}

// Expose globally for IIFE usage
// @ts-ignore
window.initPricingCalculator = initPricingCalculator;

export { initPricingCalculator };
