
// src/components/ScenarioPlanner.jsx
import React, { useState } from "react";
import { Lightbulb, TrendingUp, TrendingDown, Minus } from "lucide-react";

const ScenarioPlanner = () => {
  const [scenario, setScenario] = useState("optimistic");
  const [customInputs, setCustomInputs] = useState({
    gdpGrowth: 5.0,
    inflation: 3.5,
    investment: 25,
  });

  const scenarios = {
    optimistic: {
      name: "Optimistic Growth",
      icon: TrendingUp,
      color: "#10b981",
      gdpGrowth: 7.2,
      inflation: 2.5,
      investment: 30,
      outcome: "GDP reaches $5.8T by 2030",
    },
    realistic: {
      name: "Baseline Projection",
      icon: Minus,
      color: "#3b82f6",
      gdpGrowth: 5.5,
      inflation: 4.0,
      investment: 25,
      outcome: "GDP reaches $4.9T by 2030",
    },
    pessimistic: {
      name: "Recession Scenario",
      icon: TrendingDown,
      color: "#ef4444",
      gdpGrowth: 2.1,
      inflation: 7.5,
      investment: 18,
      outcome: "GDP reaches $3.6T by 2030",
    },
  };

  const currentScenario = scenarios[scenario];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Lightbulb size={28} color="#f59e0b" />
        <div>
          <h2 style={styles.title}>Economic Scenario Planner</h2>
          <p style={styles.subtitle}>Model different economic futures with AI predictions</p>
        </div>
      </div>

      {/* Scenario Selection */}
      <div style={styles.scenarioGrid}>
        {Object.entries(scenarios).map(([key, sc]) => (
          <div
            key={key}
            onClick={() => setScenario(key)}
            style={{
              ...styles.scenarioCard,
              ...(scenario === key ? { ...styles.scenarioCardActive, borderColor: sc.color } : {}),
            }}
          >
            <sc.icon size={32} color={sc.color} />
            <h3 style={styles.scenarioName}>{sc.name}</h3>
            <div style={styles.scenarioMetrics}>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>GDP Growth</span>
                <span style={{ ...styles.metricValue, color: sc.color }}>{sc.gdpGrowth}%</span>
              </div>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>Inflation</span>
                <span style={styles.metricValue}>{sc.inflation}%</span>
              </div>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>Investment</span>
                <span style={styles.metricValue}>{sc.investment}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Outcome Prediction */}
      <div
        style={{
          ...styles.outcomeBox,
          background: `linear-gradient(135deg, ${currentScenario.color}15, ${currentScenario.color}05)`,
          borderColor: currentScenario.color,
        }}
      >
        <div style={styles.outcomeLabel}>2030 Projection</div>
        <div style={{ ...styles.outcomeValue, color: currentScenario.color }}>
          {currentScenario.outcome}
        </div>
        <div style={styles.outcomeDetail}>
          Based on {currentScenario.gdpGrowth}% annual growth with {currentScenario.inflation}%
          inflation
        </div>
      </div>

      {/* Custom Inputs */}
      <div style={styles.customSection}>
        <h3 style={styles.customTitle}>Custom Parameters</h3>
        <div style={styles.inputGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>GDP Growth Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={customInputs.gdpGrowth}
              onChange={(e) =>
                setCustomInputs({ ...customInputs, gdpGrowth: parseFloat(e.target.value) })
              }
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Inflation Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={customInputs.inflation}
              onChange={(e) =>
                setCustomInputs({ ...customInputs, inflation: parseFloat(e.target.value) })
              }
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Investment (% of GDP)</label>
            <input
              type="number"
              step="1"
              value={customInputs.investment}
              onChange={(e) =>
                setCustomInputs({ ...customInputs, investment: parseInt(e.target.value) })
              }
              style={styles.input}
            />
          </div>
        </div>
        <button style={styles.calculateButton}>Calculate Custom Scenario</button>
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
    maxWidth: "1000px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
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
  scenarioGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  scenarioCard: {
    padding: "25px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  scenarioCardActive: {
    background: "#f8fafc",
    transform: "translateY(-4px)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  },
  scenarioName: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  scenarioMetrics: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  metric: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricLabel: {
    fontSize: "0.85rem",
    color: "#64748b",
  },
  metricValue: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#1e293b",
  },
  outcomeBox: {
    padding: "25px",
    borderRadius: "12px",
    border: "2px solid",
    marginBottom: "30px",
  },
  outcomeLabel: {
    fontSize: "0.9rem",
    color: "#64748b",
    fontWeight: "600",
    marginBottom: "8px",
  },
  outcomeValue: {
    fontSize: "1.5rem",
    fontWeight: "800",
    marginBottom: "10px",
  },
  outcomeDetail: {
    fontSize: "0.9rem",
    color: "#64748b",
  },
  customSection: {
    padding: "25px",
    background: "#f8fafc",
    borderRadius: "12px",
  },
  customTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "20px",
  },
  inputGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  inputLabel: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#64748b",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    outline: "none",
  },
  calculateButton: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default ScenarioPlanner;