// src/components/InteractiveScenarioPlanner.jsx
import React, { useState, useEffect } from "react";
import {
  Sliders,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calculator,
} from "lucide-react";

const InteractiveScenarioPlanner = () => {
  const [inputs, setInputs] = useState({
    gdpGrowth: 5.5,
    inflation: 4.0,
    investment: 25,
    population: 1.2,
    productivity: 3.0,
  });

  const [results, setResults] = useState({
    gdp2030: 0,
    perCapita: 0,
    totalGrowth: 0,
    risk: "moderate",
  });

  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    calculateScenario();
  }, [inputs]);

  const calculateScenario = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const baseGDP = 3.7; // trillion
      const years = 7;

      // Compound growth calculation
      const realGrowth = inputs.gdpGrowth - inputs.inflation;
      const productivityBonus = inputs.productivity * 0.1;
      const investmentBonus = (inputs.investment - 20) * 0.05;

      const effectiveGrowth = realGrowth + productivityBonus + investmentBonus;
      const gdp2030 = baseGDP * Math.pow(1 + effectiveGrowth / 100, years);

      const population = 1400 + inputs.population * years; // millions
      const perCapita = (gdp2030 * 1000000) / population;

      const totalGrowth = ((gdp2030 - baseGDP) / baseGDP) * 100;

      // Risk assessment
      let risk = "low";
      if (inputs.inflation > 6 || inputs.gdpGrowth < 2) risk = "high";
      else if (inputs.inflation > 4 || inputs.gdpGrowth < 4) risk = "moderate";

      setResults({
        gdp2030: gdp2030.toFixed(2),
        perCapita: perCapita.toFixed(0),
        totalGrowth: totalGrowth.toFixed(1),
        risk,
      });

      setIsCalculating(false);
    }, 500);
  };

  const handleSliderChange = (key, value) => {
    setInputs({ ...inputs, [key]: parseFloat(value) });
  };

  const presets = {
    optimistic: {
      gdpGrowth: 7.5,
      inflation: 2.5,
      investment: 32,
      population: 0.8,
      productivity: 4.5,
    },
    baseline: {
      gdpGrowth: 5.5,
      inflation: 4.0,
      investment: 25,
      population: 1.2,
      productivity: 3.0,
    },
    conservative: {
      gdpGrowth: 3.0,
      inflation: 6.5,
      investment: 18,
      population: 1.5,
      productivity: 1.5,
    },
  };

  const loadPreset = (preset) => {
    setInputs(presets[preset]);
  };

  const getRiskColor = () => {
    if (results.risk === "low") return "#10b981";
    if (results.risk === "moderate") return "#f59e0b";
    return "#ef4444";
  };

  const getRiskIcon = () => {
    if (results.risk === "low") return <CheckCircle2 size={24} />;
    if (results.risk === "moderate") return <AlertTriangle size={24} />;
    return <AlertTriangle size={24} />;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Sliders size={32} color="#3b82f6" />
        <div>
          <h2 style={styles.title}>Interactive Economic Scenario Planner</h2>
          <p style={styles.subtitle}>
            Adjust parameters in real-time to forecast India's economy by 2030
          </p>
        </div>
      </div>

      {/* Preset Buttons */}
      <div style={styles.presetBar}>
        <button
          onClick={() => loadPreset("optimistic")}
          style={{ ...styles.presetButton, background: "#10b981" }}
        >
          🚀 Optimistic Growth
        </button>
        <button
          onClick={() => loadPreset("baseline")}
          style={{ ...styles.presetButton, background: "#3b82f6" }}
        >
          📊 Baseline Scenario
        </button>
        <button
          onClick={() => loadPreset("conservative")}
          style={{ ...styles.presetButton, background: "#ef4444" }}
        >
          ⚠️ Conservative Outlook
        </button>
      </div>

      <div style={styles.content}>
        {/* Input Sliders */}
        <div style={styles.inputSection}>
          <h3 style={styles.sectionTitle}>
            <Calculator size={20} />
            Adjust Parameters
          </h3>

          {/* GDP Growth Slider */}
          <div style={styles.sliderGroup}>
            <div style={styles.sliderHeader}>
              <span style={styles.sliderLabel}>GDP Growth Rate</span>
              <span style={styles.sliderValue}>
                {inputs.gdpGrowth.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={inputs.gdpGrowth}
              onChange={(e) => handleSliderChange("gdpGrowth", e.target.value)}
              style={styles.slider}
            />
            <div style={styles.sliderLabels}>
              <span>0%</span>
              <span>5%</span>
              <span>10%</span>
            </div>
          </div>

          {/* Inflation Slider */}
          <div style={styles.sliderGroup}>
            <div style={styles.sliderHeader}>
              <span style={styles.sliderLabel}>Inflation Rate</span>
              <span style={styles.sliderValue}>
                {inputs.inflation.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              step="0.1"
              value={inputs.inflation}
              onChange={(e) => handleSliderChange("inflation", e.target.value)}
              style={styles.slider}
            />
            <div style={styles.sliderLabels}>
              <span>0%</span>
              <span>6%</span>
              <span>12%</span>
            </div>
          </div>

          {/* Investment Slider */}
          <div style={styles.sliderGroup}>
            <div style={styles.sliderHeader}>
              <span style={styles.sliderLabel}>Investment (% of GDP)</span>
              <span style={styles.sliderValue}>
                {inputs.investment.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="40"
              step="0.5"
              value={inputs.investment}
              onChange={(e) => handleSliderChange("investment", e.target.value)}
              style={styles.slider}
            />
            <div style={styles.sliderLabels}>
              <span>15%</span>
              <span>27.5%</span>
              <span>40%</span>
            </div>
          </div>

          {/* Population Growth Slider */}
          <div style={styles.sliderGroup}>
            <div style={styles.sliderHeader}>
              <span style={styles.sliderLabel}>Population Growth</span>
              <span style={styles.sliderValue}>
                {inputs.population.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={inputs.population}
              onChange={(e) => handleSliderChange("population", e.target.value)}
              style={styles.slider}
            />
            <div style={styles.sliderLabels}>
              <span>0%</span>
              <span>1.5%</span>
              <span>3%</span>
            </div>
          </div>

          {/* Productivity Slider */}
          <div style={styles.sliderGroup}>
            <div style={styles.sliderHeader}>
              <span style={styles.sliderLabel}>Productivity Gains</span>
              <span style={styles.sliderValue}>
                {inputs.productivity.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="0.1"
              value={inputs.productivity}
              onChange={(e) =>
                handleSliderChange("productivity", e.target.value)
              }
              style={styles.slider}
            />
            <div style={styles.sliderLabels}>
              <span>0%</span>
              <span>3%</span>
              <span>6%</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div style={styles.resultsSection}>
          <h3 style={styles.sectionTitle}>
            <TrendingUp size={20} />
            2030 Forecast Results
          </h3>

          {isCalculating && (
            <div style={styles.calculating}>
              <div style={styles.calculatingSpinner}></div>
              <span>Calculating...</span>
            </div>
          )}

          {!isCalculating && (
            <>
              {/* Main Result */}
              <div style={styles.mainResult}>
                <div style={styles.mainResultLabel}>Projected GDP 2030</div>
                <div style={styles.mainResultValue}>${results.gdp2030}T</div>
                <div style={styles.mainResultChange}>
                  +{results.totalGrowth}% from 2023
                </div>
              </div>

              {/* Secondary Results */}
              <div style={styles.secondaryResults}>
                <div style={styles.resultCard}>
                  <div style={styles.resultLabel}>GDP Per Capita</div>
                  <div style={styles.resultValue}>${results.perCapita}</div>
                </div>
                <div style={styles.resultCard}>
                  <div style={styles.resultLabel}>Total Growth</div>
                  <div style={styles.resultValue}>{results.totalGrowth}%</div>
                </div>
                <div
                  style={{
                    ...styles.resultCard,
                    background: getRiskColor() + "15",
                    border: `2px solid ${getRiskColor()}`,
                  }}
                >
                  <div style={styles.resultLabel}>Risk Level</div>
                  <div
                    style={{
                      ...styles.resultValue,
                      color: getRiskColor(),
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {getRiskIcon()}
                    {results.risk.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div style={styles.insights}>
                <h4 style={styles.insightsTitle}>AI Analysis</h4>
                <div style={styles.insightsList}>
                  {inputs.gdpGrowth > 6 && (
                    <div style={styles.insightItem}>
                      ✅ High growth rate suggests strong economic expansion
                    </div>
                  )}
                  {inputs.inflation > 5 && (
                    <div style={styles.insightItem}>
                      ⚠️ Elevated inflation may constrain real growth
                    </div>
                  )}
                  {inputs.investment > 28 && (
                    <div style={styles.insightItem}>
                      💪 High investment levels support sustainable growth
                    </div>
                  )}
                  {inputs.productivity > 3.5 && (
                    <div style={styles.insightItem}>
                      🚀 Strong productivity gains amplify economic output
                    </div>
                  )}
                  {results.gdp2030 > 5 && (
                    <div style={styles.insightItem}>
                      🎯 On track to become 3rd largest economy globally
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Visualization Bar */}
      <div style={styles.visualization}>
        <h3 style={styles.visualizationTitle}>Growth Trajectory</h3>
        <div style={styles.growthBar}>
          <div style={styles.currentGDP}>
            <div style={styles.barLabel}>2023</div>
            <div
              style={{ ...styles.bar, width: "37%", background: "#3b82f6" }}
            ></div>
            <div style={styles.barValue}>$3.7T</div>
          </div>
          <div style={styles.projectedGDP}>
            <div style={styles.barLabel}>2030</div>
            <div
              style={{
                ...styles.bar,
                width: `${(parseFloat(results.gdp2030) / 10) * 100}%`,
                background: "linear-gradient(90deg, #10b981, #3b82f6)",
              }}
            ></div>
            <div style={styles.barValue}>${results.gdp2030}T</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    borderRadius: "20px",
    padding: "40px",
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
    fontSize: "1rem",
    color: "#64748b",
    margin: "5px 0 0 0",
  },
  presetBar: {
    display: "flex",
    gap: "15px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  presetButton: {
    flex: 1,
    padding: "14px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s",
    minWidth: "200px",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
  },
  inputSection: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  sectionTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1e293b",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "0 0 20px 0",
  },
  sliderGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sliderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderLabel: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#64748b",
  },
  sliderValue: {
    fontSize: "1.2rem",
    fontWeight: "800",
    color: "#1e293b",
    background: "#f8fafc",
    padding: "4px 12px",
    borderRadius: "6px",
  },
  slider: {
    width: "100%",
    height: "8px",
    borderRadius: "4px",
    outline: "none",
    background: "linear-gradient(90deg, #e2e8f0, #3b82f6)",
    cursor: "pointer",
  },
  sliderLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.75rem",
    color: "#94a3b8",
  },
  resultsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "30px",
    background: "linear-gradient(135deg, #f8fafc, #e0f2fe)",
    borderRadius: "16px",
  },
  calculating: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    padding: "60px",
    color: "#64748b",
  },
  calculatingSpinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  mainResult: {
    textAlign: "center",
    padding: "30px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  mainResultLabel: {
    fontSize: "0.9rem",
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: "0.5px",
    marginBottom: "10px",
  },
  mainResultValue: {
    fontSize: "3.5rem",
    fontWeight: "900",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "10px",
  },
  mainResultChange: {
    fontSize: "1.1rem",
    color: "#10b981",
    fontWeight: "700",
  },
  secondaryResults: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
  },
  resultCard: {
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  resultLabel: {
    fontSize: "0.8rem",
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  resultValue: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#1e293b",
  },
  insights: {
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
  },
  insightsTitle: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "15px",
  },
  insightsList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  insightItem: {
    fontSize: "0.9rem",
    color: "#475569",
    padding: "10px",
    background: "#f8fafc",
    borderRadius: "6px",
    borderLeft: "3px solid #3b82f6",
  },
  visualization: {
    marginTop: "40px",
    padding: "30px",
    background: "#f8fafc",
    borderRadius: "16px",
  },
  visualizationTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "20px",
  },
  growthBar: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  currentGDP: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  projectedGDP: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  barLabel: {
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "#64748b",
    width: "60px",
  },
  bar: {
    height: "40px",
    borderRadius: "8px",
    transition: "all 0.5s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  barValue: {
    fontSize: "1.2rem",
    fontWeight: "800",
    color: "#1e293b",
  },
};

export default InteractiveScenarioPlanner;
