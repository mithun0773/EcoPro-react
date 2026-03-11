import React from "react";

const StatsCard = ({ title, value, unit, trend = "stable", change = "" }) => {
  const getTrendIcon = () => {
    if (trend === "up") return "↗️";
    if (trend === "down") return "↘️";
    return "➡️";
  };

  const getTrendColor = () => {
    if (trend === "up") return "#10b981";
    if (trend === "down") return "#ef4444";
    return "#64748b";
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <span style={styles.trendIcon}>{getTrendIcon()}</span>
      </div>

      <div style={styles.valueContainer}>
        <p style={styles.value}>
          {value} <span style={styles.unit}>{unit}</span>
        </p>
      </div>

      {change && (
        <div style={styles.changeContainer}>
          <span
            style={{
              ...styles.change,
              color: getTrendColor(),
            }}
          >
            {change}
          </span>
          <span style={styles.changeLabel}>vs last period</span>
        </div>
      )}

      <div style={styles.liveIndicator}>
        <span style={styles.pulse}></span>
        <span style={styles.liveText}>Live</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    position: "relative",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "20px",
    minWidth: "220px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  title: {
    fontSize: "0.95rem",
    color: "#64748b",
    fontWeight: "500",
    margin: 0,
  },
  trendIcon: {
    fontSize: "1.3rem",
  },
  valueContainer: {
    marginBottom: "10px",
  },
  value: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  unit: {
    fontSize: "1.2rem",
    color: "#64748b",
    fontWeight: "500",
  },
  changeContainer: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginBottom: "12px",
  },
  change: {
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  changeLabel: {
    fontSize: "0.8rem",
    color: "#94a3b8",
  },
  liveIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    position: "absolute",
    top: "15px",
    right: "15px",
  },
  pulse: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#10b981",
    animation: "pulse 2s infinite",
  },
  liveText: {
    fontSize: "0.75rem",
    color: "#10b981",
    fontWeight: "600",
  },
};

const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(
      `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `,
      styleSheet.cssRules.length,
    );
  } catch (e) {}
}

export default StatsCard;
