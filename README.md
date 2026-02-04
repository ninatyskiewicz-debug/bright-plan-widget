# Pricing Widget - No-Iframe Embeddable Component

A minimal React widget designed to be embedded in Webflow (or any HTML page) **without an iframe**.

## Architecture

```
src/
├── widget-entry.tsx      # Entry point for IIFE build
├── widget-init.tsx       # Contains initPricingCalculator (mount logic)
├── components/
│   └── PricingWidget.tsx # The actual widget UI
└── main.tsx              # Standard React app entry (for Lovable preview)
```

## Key Files

| File | Purpose |
|------|---------|
| `src/widget-init.tsx` | **Contains `window.initPricingCalculator`** - the global mount function |
| `src/widget-entry.tsx` | Entry point for building IIFE bundle |
| `vite.config.widget.ts` | Vite config for building single JS file |

## Building the Widget (After GitHub Export)

1. Clone the exported repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the IIFE bundle:
   ```bash
   npx vite build --config vite.config.widget.ts
   ```
4. Output: `dist/pricing-widget.iife.js`

## Embedding in Webflow

```html
<!-- 1. Add mount point (normal div, not iframe) -->
<div id="pricing-calculator-root"></div>

<!-- 2. Load the widget bundle -->
<script src="https://your-cdn.com/pricing-widget.iife.js"></script>

<!-- 3. Initialize -->
<script>
  window.initPricingCalculator({ 
    mountId: "pricing-calculator-root",
    calcVersion: "v1.0.0"  // optional
  });
</script>
```

## Analytics Events

The widget emits CustomEvents on `window` for GTM/GA4:

```javascript
// Listen for widget events
window.addEventListener("pricing_calc_start", (e) => {
  console.log("Widget interaction:", e.detail);
  // { calc_version: "spike_v0", click_count: 1 }
  
  // Push to GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "pricing_calc_start",
    ...e.detail
  });
});
```

## Lazy Loading (Optional)

```html
<script>
  // Load widget when section enters viewport
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const script = document.createElement("script");
      script.src = "https://your-cdn.com/pricing-widget.iife.js";
      script.onload = () => {
        window.initPricingCalculator({ mountId: "pricing-calculator-root" });
      };
      document.body.appendChild(script);
      observer.disconnect();
    }
  });
  observer.observe(document.getElementById("pricing-calculator-root"));
</script>
```

## Graceful Fallback

```html
<div id="pricing-calculator-root">
  <!-- Fallback content shown if JS fails -->
  <p>Loading pricing calculator...</p>
  <noscript>
    <p>Please enable JavaScript to use the pricing calculator.</p>
    <a href="/contact">Contact us for pricing</a>
  </noscript>
</div>
```

## Development

In Lovable, the widget previews using the standard React app entry (`src/main.tsx`).
The widget-specific entry (`src/widget-entry.tsx`) is only used when building the IIFE bundle.
