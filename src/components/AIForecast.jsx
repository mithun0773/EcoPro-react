import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  hybridForecast,
  detectAnomalies,
  generateForecastInsights,
} from "../utils/forecastUtils";
import { TrendingUp, AlertCircle, Zap } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const AIForecast = ({ years, values, indicator, primaryColor = "#4f46e5" }) => {
  const [showConfidenceInterval, setShowConfidenceInterval] = useState(true);
  const [showAnomalies, setShowAnomalies] = useState(true);

  const forecastData = useMemo(() => {
    if (!values || values.length === 0) return null;
    return hybridForecast(values, 7);
  }, [values]);

  const anomalies = useMemo(() => {
    if (!values || values.length === 0) return [];
    return detectAnomalies(values);
  }, [values]);

  const insights = useMemo(() => {
    if (!values || !forecastData) return [];
    return generateForecastInsights(values, forecastData, indicator);
  }, [values, forecastData, indicator]);

  if (!forecastData) {
    return (
      <div style={styles.container}>
        <p style={styles.noData}>Insufficient data for AI forecasting</p>
      </div>
    );
  }

  const { forecast, trendInfo } = forecastData;

  const allYears = [...years, ...forecast.map((f) => f.year.toString())];

  const historicalData = [...values, ...Array(forecast.length).fill(null)];

  const forecastValues = [
    ...Array(values.length - 1).fill(null),
    values[values.length - 1],
    ...forecast.map((f) => f.value),
  ];

  const upperBound = [
    ...Array(values.length - 1).fill(null),
    values[values.length - 1],
    ...forecast.map((f) => f.upperBound),
  ];

  const lowerBound = [
    ...Array(values.length - 1).fill(null),
    values[values.length - 1],
    ...forecast.map((f) => f.lowerBound),
  ];

  const chartData = {
    labels: allYears,
    datasets: [
      {
        label: `Historical ${indicator}`,
        data: historicalData,
        borderColor: primaryColor,
        backgroundColor: `${primaryColor}40`,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.4,
        fill: false,
      },
      {
        label: `AI Forecast (${trendInfo.reliability} confidence)`,
        data: forecastValues,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        borderWidth: 2.5,
        borderDash: [8, 4],
        pointRadius: 4,
        pointBackgroundColor: "#f59e0b",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.4,
        fill: false,
      },
      showConfidenceInterval && {
        label: "Upper Bound (95% CI)",
        data: upperBound,
        borderColor: "rgba(245, 158, 11, 0.3)",
        backgroundColor: "rgba(245, 158, 11, 0.05)",
        borderWidth: 1,
        borderDash: [2, 2],
        pointRadius: 0,
        tension: 0.4,
        fill: "+1",
      },
      showConfidenceInterval && {
        label: "Lower Bound (95% CI)",
        data: lowerBound,
        borderColor: "rgba(245, 158, 11, 0.3)",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        borderWidth: 1,
        borderDash: [2, 2],
        pointRadius: 0,
        tension: 0.4,
        fill: "-1",
      },
      showAnomalies && {
        label: "Anomalies",
        data: anomalies.map((a) => ({
          x: allYears[a.index],
          y: a.value,
        })),
        type: "scatter",
        backgroundColor: "#ef4444",
        borderColor: "#fff",
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10,
      },
    ].filter(Boolean),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 11 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            if (!value) return null;
            return `${context.dataset.label}: ${value.toLocaleString()}`;
          },
          afterLabel: (context) => {
            const datasetIndex = context.datasetIndex;
            const dataIndex = context.dataIndex;

            if (datasetIndex === 1 && dataIndex >= values.length) {
              const forecastIndex = dataIndex - values.length;
              const confidence = forecast[forecastIndex]?.confidence;
              if (confidence) {
                return `Confidence: ${(confidence * 100).toFixed(0)}%`;
              }
            }
            return null;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => value.toLocaleString(),
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <Zap size={24} color="#f59e0b" />
          <h3 style={styles.title}>AI Predictive Forecast (2024-2030)</h3>
        </div>

        <div style={styles.controls}>
          <button
            style={{
              ...styles.toggleButton,
              ...(showConfidenceInterval ? styles.toggleButtonActive : {}),
            }}
            onClick={() => setShowConfidenceInterval(!showConfidenceInterval)}
          >
            Confidence Interval
          </button>
          <button
            style={{
              ...styles.toggleButton,
              ...(showAnomalies ? styles.toggleButtonActive : {}),
            }}
            onClick={() => setShowAnomalies(!showAnomalies)}
          >
            Anomalies ({anomalies.length})
          </button>
        </div>
      </div>

      <div style={styles.chartContainer}>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div style={styles.insightsContainer}>
        <h4 style={styles.insightsTitle}>
          <TrendingUp size={18} />
          AI Analysis & Insights
        </h4>
        <div style={styles.insightsGrid}>
          {insights.map((insight, i) => (
            <div key={i} style={styles.insightCard}>
              <span style={styles.insightIcon}>{insight.icon}</span>
              <div>
                <div style={styles.insightCardTitle}>{insight.title}</div>
                <div style={styles.insightCardMessage}>{insight.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.methodologyNote}>
        <AlertCircle size={16} color="#64748b" />
        <span style={styles.methodologyText}>
          Forecast generated using hybrid AI model (Linear Regression +
          Exponential Smoothing). Confidence intervals represent 95% prediction
          range. R² = {trendInfo.rSquared?.toFixed(3) || "N/A"}
        </span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    marginTop: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px",
  },
  titleSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  controls: {
    display: "flex",
    gap: "10px",
  },
  toggleButton: {
    padding: "8px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    background: "#fff",
    color: "#64748b",
    fontSize: "0.85rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  toggleButtonActive: {
    background: "#f59e0b",
    color: "#fff",
    borderColor: "#f59e0b",
  },
  chartContainer: {
    height: "450px",
    marginBottom: "25px",
  },
  insightsContainer: {
    marginTop: "25px",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "8px",
  },
  insightsTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  insightsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "12px",
  },
  insightCard: {
    display: "flex",
    gap: "12px",
    background: "#fff",
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  insightIcon: {
    fontSize: "1.5rem",
    flexShrink: 0,
  },
  insightCardTitle: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "4px",
  },
  insightCardMessage: {
    fontSize: "0.85rem",
    color: "#64748b",
    lineHeight: "1.5",
  },
  methodologyNote: {
    marginTop: "20px",
    padding: "12px 16px",
    background: "#f1f5f9",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  methodologyText: {
    fontSize: "0.8rem",
    color: "#64748b",
    lineHeight: "1.5",
  },
  noData: {
    textAlign: "center",
    padding: "40px",
    color: "#94a3b8",
    fontSize: "1rem",
  },
};

export default AIForecast;
