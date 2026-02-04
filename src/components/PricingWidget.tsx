import { useState } from "react";

interface PricingWidgetProps {
  calcVersion?: string;
}

/**
 * Minimal pricing widget for spike/POC.
 * Emits CustomEvents for GTM/GA4 integration.
 */
const PricingWidget = ({ calcVersion = "spike_v0" }: PricingWidgetProps) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);

    // Emit custom event for analytics (GTM/GA4)
    window.dispatchEvent(
      new CustomEvent("pricing_calc_start", {
        detail: { calc_version: calcVersion, click_count: count + 1 },
      })
    );
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        maxWidth: "320px",
      }}
    >
      <h2
        style={{
          margin: "0 0 16px 0",
          fontSize: "20px",
          fontWeight: 600,
          color: "#111827",
        }}
      >
        Hello Pricing Widget
      </h2>
      <p
        style={{
          margin: "0 0 16px 0",
          fontSize: "14px",
          color: "#6b7280",
        }}
      >
        Counter: <strong style={{ color: "#111827" }}>{count}</strong>
      </p>
      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          fontSize: "14px",
          fontWeight: 500,
          color: "#ffffff",
          backgroundColor: "#3b82f6",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
      >
        Click me
      </button>
    </div>
  );
};

export default PricingWidget;
