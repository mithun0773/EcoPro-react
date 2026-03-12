// src/components/EconomicHeatmap.jsx
import React, { useState } from "react";
import { Map, TrendingUp, AlertCircle } from "lucide-react";

const EconomicHeatmap = () => {
  const [selectedIndicator, setSelectedIndicator] = useState("gdp");
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const indicators = [
    { id: "gdp", name: "GDP Growth", color: "#3b82f6" },
    { id: "inflation", name: "Inflation Rate", color: "#ef4444" },
    { id: "unemployment", name: "Unemployment", color: "#f59e0b" },
    { id: "debt", name: "Debt-to-GDP", color: "#8b5cf6" },
  ];

  const regions = [
    { name: "North America", value: 7.2, trend: "up", color: "#10b981" },
    { name: "South America", value: 4.5, trend: "stable", color: "#f59e0b" },
    { name: "Europe", value: 2.1, trend: "down", color: "#ef4444" },
    { name: "Asia", value: 8.9, trend: "up", color: "#10b981" },
    { name: "Africa", value: 5.3, trend: "up", color: "#3b82f6" },
    { name: "Oceania", value: 3.8, trend: "stable", color: "#64748b" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Map size={28} color="#3b82f6" />
        <div>
          <h2 style={styles.title}>Global Economic Heatmap</h2>
          <p style={styles.subtitle}>
            Visual representation of worldwide economic performance
          </p>
        </div>
      </div>

      {/* Indicator Selector */}
      <div style={styles.indicatorSelector}>
        {indicators.map((indicator) => (
          <button
            key={indicator.id}
            onClick={() => setSelectedIndicator(indicator.id)}
            style={{
              ...styles.indicatorButton,
              ...(selectedIndicator === indicator.id
                ? {
                    ...styles.indicatorButtonActive,
                    borderColor: indicator.color,
                  }
                : {}),
            }}
          >
            {indicator.name}
          </button>
        ))}
      </div>

      {/* Map Visualization */}
      <div style={styles.mapContainer}>
        <svg viewBox="0 0 1000 500" style={styles.svg}>
          {/* Simplified world map representation */}
          {regions.map((region, i) => (
            <g key={region.name}>
              <rect
                x={i * 160 + 20}
                y={100}
                width={140}
                height={200}
                fill={region.color}
                opacity={0.6}
                rx={8}
                onMouseEnter={() => setHoveredCountry(region)}
                onMouseLeave={() => setHoveredCountry(null)}
                style={{ cursor: "pointer", transition: "all 0.3s" }}
              />
              <text
                x={i * 160 + 90}
                y={350}
                textAnchor="middle"
                fill="#1e293b"
                fontSize="14"
                fontWeight="600"
              >
                {region.name}
              </text>
              <text
                x={i * 160 + 90}
                y={370}
                textAnchor="middle"
                fill={region.color}
                fontSize="20"
                fontWeight="800"
              >
                {region.value}%
              </text>
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredCountry && (
          <div style={styles.tooltip}>
            <div style={styles.tooltipTitle}>{hoveredCountry.name}</div>
            <div style={styles.tooltipValue}>
              <TrendingUp size={16} color={hoveredCountry.color} />
              {hoveredCountry.value}% Growth
            </div>
            <div style={styles.tooltipTrend}>Trend: {hoveredCountry.trend}</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, background: "#10b981" }}></div>
          <span>Strong Growth (&gt;6%)</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, background: "#3b82f6" }}></div>
          <span>Moderate Growth (3-6%)</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, background: "#f59e0b" }}></div>
          <span>Slow Growth (1-3%)</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, background: "#ef4444" }}></div>
          <span>Declining (&lt;1%)</span>
        </div>
      </div>

      <div style={styles.notice}>
        <AlertCircle size={16} />
        <span>Data updated daily from World Bank & IMF sources</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    margin: "40px auto",
    maxWidth: "1200px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#64748b",
    margin: "5px 0 0 0",
  },
  indicatorSelector: {
    display: "flex",
    gap: "12px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  indicatorButton: {
    padding: "10px 20px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    background: "#fff",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#64748b",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  indicatorButtonActive: {
    background: "#f8fafc",
    color: "#1e293b",
  },
  mapContainer: {
    position: "relative",
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "25px",
  },
  svg: {
    width: "100%",
    height: "400px",
  },
  tooltip: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    minWidth: "200px",
  },
  tooltipTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
  },
  tooltipValue: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "5px",
  },
  tooltipTrend: {
    fontSize: "0.85rem",
    color: "#64748b",
  },
  legend: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9rem",
    color: "#64748b",
  },
  legendDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  },
  notice: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px",
    background: "#f1f5f9",
    borderRadius: "8px",
    fontSize: "0.85rem",
    color: "#64748b",
  },
};

export default EconomicHeatmap;
