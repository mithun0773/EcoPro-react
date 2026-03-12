// src/components/LiveMarketTicker.jsx
import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  BarChart3,
} from "lucide-react";

const LiveMarketTicker = () => {
  const [marketData, setMarketData] = useState([
    {
      symbol: "S&P 500",
      value: 5875.23,
      change: 0,
      percent: 0,
      trend: [],
      volume: "2.3B",
    },
    {
      symbol: "DOW JONES",
      value: 43250.18,
      change: 0,
      percent: 0,
      trend: [],
      volume: "1.8B",
    },
    {
      symbol: "NASDAQ",
      value: 18420.45,
      change: 0,
      percent: 0,
      trend: [],
      volume: "3.1B",
    },
    {
      symbol: "FTSE 100",
      value: 8245.67,
      change: 0,
      percent: 0,
      trend: [],
      volume: "890M",
    },
    {
      symbol: "DAX",
      value: 19875.32,
      change: 0,
      percent: 0,
      trend: [],
      volume: "720M",
    },
    {
      symbol: "NIKKEI",
      value: 39125.88,
      change: 0,
      percent: 0,
      trend: [],
      volume: "1.2B",
    },
    {
      symbol: "SENSEX",
      value: 81250.45,
      change: 0,
      percent: 0,
      trend: [],
      volume: "650M",
    },
    {
      symbol: "HANG SENG",
      value: 20145.23,
      change: 0,
      percent: 0,
      trend: [],
      volume: "540M",
    },
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => {
          const changeAmount = (Math.random() - 0.5) * 20;
          const newValue = item.value + changeAmount;
          const percentChange = (changeAmount / item.value) * 100;

          // Keep last 20 values for trend line
          const newTrend = [...item.trend, newValue].slice(-20);

          return {
            ...item,
            value: newValue,
            change: changeAmount,
            percent: percentChange,
            trend: newTrend,
          };
        }),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate selected index
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % marketData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, marketData.length]);

  const selectedMarket = marketData[selectedIndex];

  const renderMiniSparkline = (trend) => {
    if (trend.length < 2) return null;

    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min;

    const points = trend
      .map((val, i) => {
        const x = (i / (trend.length - 1)) * 60;
        const y = 20 - ((val - min) / range) * 15;
        return `${x},${y}`;
      })
      .join(" ");

    const color = trend[trend.length - 1] > trend[0] ? "#10b981" : "#ef4444";

    return (
      <svg width="60" height="20" style={{ marginLeft: "8px" }}>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
    );
  };

  const renderLargeChart = (trend) => {
    if (trend.length < 2) return null;

    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min;

    const points = trend
      .map((val, i) => {
        const x = (i / (trend.length - 1)) * 100;
        const y = 80 - ((val - min) / range) * 60;
        return `${x},${y}`;
      })
      .join(" ");

    const color = trend[trend.length - 1] > trend[0] ? "#10b981" : "#ef4444";
    const gradientId = `gradient-${selectedIndex}`;

    return (
      <svg
        width="100%"
        height="100"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={`url(#${gradientId})`}
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
        />

        {/* Dots */}
        {trend.map((val, i) => {
          const x = (i / (trend.length - 1)) * 100;
          const y = 80 - ((val - min) / range) * 60;
          return <circle key={i} cx={x} cy={y} r="0.5" fill={color} />;
        })}
      </svg>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Activity size={28} color="#3b82f6" />
        <div>
          <h2 style={styles.title}>Live Market Ticker</h2>
          <p style={styles.subtitle}>
            Real-time global market indices with interactive charts
          </p>
        </div>
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          style={{
            ...styles.autoPlayButton,
            background: autoPlay ? "#10b981" : "#64748b",
          }}
        >
          {autoPlay ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      {/* Scrolling Ticker */}
      <div style={styles.tickerContainer}>
        <div style={styles.tickerTrack}>
          {[...marketData, ...marketData].map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedIndex(i % marketData.length);
                setAutoPlay(false);
              }}
              style={{
                ...styles.tickerItem,
                ...(i % marketData.length === selectedIndex
                  ? styles.tickerItemActive
                  : {}),
              }}
            >
              <div style={styles.tickerSymbol}>{item.symbol}</div>
              <div style={styles.tickerValue}>{item.value.toFixed(2)}</div>
              <div
                style={{
                  ...styles.tickerChange,
                  color: item.change >= 0 ? "#10b981" : "#ef4444",
                }}
              >
                {item.change >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {item.change >= 0 ? "+" : ""}
                {item.change.toFixed(2)}({item.percent >= 0 ? "+" : ""}
                {item.percent.toFixed(2)}%)
              </div>
              {renderMiniSparkline(item.trend)}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed View */}
      <div style={styles.detailView}>
        <div style={styles.detailHeader}>
          <div>
            <h3 style={styles.detailSymbol}>{selectedMarket.symbol}</h3>
            <p style={styles.detailExchange}>Global Market Index</p>
          </div>
          <div style={styles.detailPrice}>
            <div style={styles.priceValue}>
              {selectedMarket.value.toFixed(2)}
            </div>
            <div
              style={{
                ...styles.priceChange,
                color: selectedMarket.change >= 0 ? "#10b981" : "#ef4444",
              }}
            >
              {selectedMarket.change >= 0 ? (
                <TrendingUp size={20} />
              ) : (
                <TrendingDown size={20} />
              )}
              {selectedMarket.change >= 0 ? "+" : ""}
              {selectedMarket.change.toFixed(2)}(
              {selectedMarket.percent >= 0 ? "+" : ""}
              {selectedMarket.percent.toFixed(2)}%)
            </div>
          </div>
        </div>

        {/* Large Chart */}
        <div style={styles.chartContainer}>
          {renderLargeChart(selectedMarket.trend)}
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <DollarSign size={20} color="#3b82f6" />
            <div>
              <div style={styles.statLabel}>Current Value</div>
              <div style={styles.statValue}>
                {selectedMarket.value.toFixed(2)}
              </div>
            </div>
          </div>

          <div style={styles.statCard}>
            <BarChart3 size={20} color="#10b981" />
            <div>
              <div style={styles.statLabel}>Volume</div>
              <div style={styles.statValue}>{selectedMarket.volume}</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <Activity size={20} color="#f59e0b" />
            <div>
              <div style={styles.statLabel}>24h Change</div>
              <div
                style={{
                  ...styles.statValue,
                  color: selectedMarket.percent >= 0 ? "#10b981" : "#ef4444",
                }}
              >
                {selectedMarket.percent >= 0 ? "+" : ""}
                {selectedMarket.percent.toFixed(2)}%
              </div>
            </div>
          </div>

          <div style={styles.statCard}>
            {selectedMarket.trend.length > 0 && (
              <>
                <TrendingUp size={20} color="#8b5cf6" />
                <div>
                  <div style={styles.statLabel}>High</div>
                  <div style={styles.statValue}>
                    {Math.max(...selectedMarket.trend).toFixed(2)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Market Selector Pills */}
      <div style={styles.selectorPills}>
        {marketData.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedIndex(i);
              setAutoPlay(false);
            }}
            style={{
              ...styles.pill,
              ...(i === selectedIndex ? styles.pillActive : {}),
            }}
          >
            {item.symbol}
          </button>
        ))}
      </div>

      {/* Live Indicator */}
      <div style={styles.liveIndicator}>
        <span style={styles.liveDot}></span>
        <span>Live Market Data • Updates every 2 seconds</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    margin: "40px auto",
    maxWidth: "1400px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1e293b",
    margin: 0,
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#64748b",
    margin: "5px 0 0 0",
  },
  autoPlayButton: {
    marginLeft: "auto",
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  tickerContainer: {
    overflow: "hidden",
    background: "#0f172a",
    borderRadius: "12px",
    padding: "15px 0",
    marginBottom: "30px",
  },
  tickerTrack: {
    display: "flex",
    gap: "40px",
    animation: "scroll 60s linear infinite",
    paddingLeft: "100%",
  },
  tickerItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 20px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "8px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: "all 0.3s",
    minWidth: "300px",
  },
  tickerItemActive: {
    background: "rgba(59, 130, 246, 0.2)",
    border: "1px solid #3b82f6",
  },
  tickerSymbol: {
    color: "#94a3b8",
    fontSize: "0.85rem",
    fontWeight: "700",
  },
  tickerValue: {
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "700",
  },
  tickerChange: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  detailView: {
    background: "linear-gradient(135deg, #f8fafc, #e0f2fe)",
    borderRadius: "16px",
    padding: "30px",
    marginBottom: "30px",
  },
  detailHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "25px",
  },
  detailSymbol: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1e293b",
    margin: 0,
  },
  detailExchange: {
    fontSize: "0.9rem",
    color: "#64748b",
    margin: "5px 0 0 0",
  },
  detailPrice: {
    textAlign: "right",
  },
  priceValue: {
    fontSize: "2.5rem",
    fontWeight: "900",
    color: "#1e293b",
  },
  priceChange: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "1.2rem",
    fontWeight: "700",
    justifyContent: "flex-end",
    marginTop: "8px",
  },
  chartContainer: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "25px",
    minHeight: "120px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  statLabel: {
    fontSize: "0.8rem",
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: "4px",
  },
  statValue: {
    fontSize: "1.3rem",
    fontWeight: "800",
    color: "#1e293b",
  },
  selectorPills: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  pill: {
    padding: "8px 16px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#64748b",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  pillActive: {
    background: "#3b82f6",
    color: "#fff",
    borderColor: "#3b82f6",
  },
  liveIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "center",
    padding: "12px",
    background: "#f1f5f9",
    borderRadius: "8px",
    fontSize: "0.85rem",
    color: "#64748b",
    fontWeight: "600",
  },
  liveDot: {
    width: "8px",
    height: "8px",
    background: "#10b981",
    borderRadius: "50%",
    animation: "pulse 2s infinite",
  },
};

// Add scroll animation
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

export default LiveMarketTicker;
