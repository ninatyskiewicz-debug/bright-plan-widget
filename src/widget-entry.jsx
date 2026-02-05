import React from "react";
import { createRoot } from "react-dom/client";

function HelloWidget() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <h3 style={{ margin: 0, fontFamily: "sans-serif" }}>Hello Pricing Widget</h3>
      <p style={{ fontFamily: "sans-serif" }}>Counter: {count}</p>
      <button
        onClick={() => {
          if (count === 0) {
            window.dispatchEvent(
              new CustomEvent("pricing_calc_start", { detail: { calc_version: "spike_v0" } })
            );
          }
          setCount((c) => c + 1);
        }}
      >
        Click me
      </button>
    </div>
  );
}

window.initPricingCalculator = function ({ mountId }) {
  const el = document.getElementById(mountId);
  if (!el) {
    console.error("Mount element not found:", mountId);
    return;
  }
  createRoot(el).render(<HelloWidget />);
};
