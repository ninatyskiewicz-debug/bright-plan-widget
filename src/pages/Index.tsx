import { useEffect } from "react";
import PricingWidget from "@/components/PricingWidget";

/**
 * Preview page for the pricing widget.
 * This demonstrates how the widget looks when mounted.
 * 
 * In production (Webflow), the widget is mounted via:
 * window.initPricingCalculator({ mountId: "pricing-calculator-root" })
 */
const Index = () => {
  useEffect(() => {
    // Listen for widget events (demo)
    const handleEvent = (e: CustomEvent) => {
      console.log("📊 Widget Event:", e.type, e.detail);
    };

    window.addEventListener("pricing_calc_start", handleEvent as EventListener);
    return () => {
      window.removeEventListener("pricing_calc_start", handleEvent as EventListener);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">Pricing Widget Spike</h1>
        <p className="text-muted-foreground">
          Open DevTools console to see CustomEvents
        </p>
      </div>

      {/* Widget preview */}
      <PricingWidget calcVersion="spike_v0" />

      <div className="max-w-md rounded-lg border bg-muted/50 p-4 text-sm">
        <p className="font-medium">How to embed (no iframe):</p>
        <pre className="mt-2 overflow-x-auto text-xs text-muted-foreground">
{`<div id="pricing-calculator-root"></div>
<script src="pricing-widget.iife.js"></script>
<script>
  initPricingCalculator({ mountId: "..." })
</script>`}
        </pre>
      </div>
    </div>
  );
};

export default Index;
