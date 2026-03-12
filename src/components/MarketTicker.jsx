// src/components/MarketTicker.jsx
import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const MarketTicker = () => {
  const [tickerData, setTickerData] = useState([
    { name: "Global GDP", value: "$105.4T", change: "+2.8%", positive: true },
    { name: "US Inflation", value: "3.2%", change: "-0.4%", positive: true },
    { name: "India Growth", value: "7.2%", change: "+0.3%", positive: true },
    { name: "EU Employment", value: "68.5%", change: "+1.1%", positive: true },
    { name: "China GDP", value: "$18.5T", change: "+4.9%", positive: true },
    { name: "Oil Price", value: "$82.5", change: "-2.1%", positive: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData((prev) =>
        prev.map((item) => ({
          ...item,
          value:
            item.name === "Oil Price"
              ? `$${(82.5 + Math.random() * 2 - 1).toFixed(1)}`
              : item.value,
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.ticker}>
      <div style={styles.tickerTrack}>
        {[...tickerData, ...tickerData].map((item, i) => (
          <div key={i} style={styles.tickerItem}>
            <span style={styles.itemName}>{item.name}</span>
            <span style={styles.itemValue}>{item.value}</span>
            <span
              style={{
                ...styles.itemChange,
                color: item.positive ? "#10b981" : "#ef4444",
              }}
            >
              {item.positive ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  ticker: {
    background: "#1e293b",
    padding: "15px 0",
    overflow: "hidden",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  tickerTrack: {
    display: "flex",
    gap: "60px",
    animation: "scroll 30s linear infinite",
  },
  tickerItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    whiteSpace: "nowrap",
  },
  itemName: {
    color: "#94a3b8",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  itemValue: {
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "700",
  },
  itemChange: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
};

// Add to your global CSS
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(
      `
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `,
      styleSheet.cssRules.length,
    );
  } catch (e) {}
}

export default MarketTicker;
