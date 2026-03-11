import React, { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import AIForecast from "./AIForecast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const dataCache = {};

const EconomicChart = ({
  indicator,
  title,
  emoji = "🌐",
  primaryColor = "#3b82f6",
  description = "Comprehensive Economic Analysis (1960–2023)",
}) => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("India");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("line");

  const parseCSVData = (csvPath) => {
    return new Promise((resolve, reject) => {
      if (dataCache[csvPath]) {
        resolve(dataCache[csvPath]);
        return;
      }
      Papa.parse(csvPath, {
        download: true,
        header: true,
        skipEmptyLines: true,
        beforeFirstChunk: (chunk) => {
          const lines = chunk.split("\n");
          const headerLineIndex = lines.findIndex((line) =>
            line.includes("Country Name"),
          );
          return lines.slice(headerLineIndex).join("\n");
        },
        complete: (result) => {
          const parsedData = result.data.filter((row) => row["Country Name"]);
          dataCache[csvPath] = parsedData;
          resolve(parsedData);
        },
        error: reject,
      });
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const parsedData = await parseCSVData(`/data/${indicator}.csv`);
        const countryList = [
          ...new Set(parsedData.map((row) => row["Country Name"])),
        ]
          .filter(Boolean)
          .sort();
        setCountries(countryList);
        const countryRow = parsedData.find(
          (row) => row["Country Name"]?.trim() === country,
        );
        if (countryRow) {
          setData(countryRow);
        } else {
          setError(`Data unavailable for ${country}`);
        }
        setLoading(false);
      } catch (err) {
        console.error("Data loading error:", err);
        setError("Data connection failed. Please check your CSV files.");
        setLoading(false);
      }
    };
    loadData();
  }, [indicator, country]);

  const { years, values, growthRates, insights } = useMemo(() => {
    const yearKeys = Object.keys(data).filter(
      (key) => Number(key) >= 1960 && Number(key) <= 2023,
    );
    const dataValues = yearKeys.map(
      (year) => Number(data[year]?.replace(/,/g, "")) || 0,
    );

    const growth = dataValues.map((v, i) =>
      i === 0 ? 0 : ((v - dataValues[i - 1]) / dataValues[i - 1]) * 100,
    );

    const latest = dataValues[dataValues.length - 1] || 0;
    const peak = Math.max(...dataValues);
    const avg = dataValues.reduce((a, b) => a + b, 0) / dataValues.length;
    const momentum =
      latest > (dataValues[dataValues.length - 2] || 0)
        ? "Positive"
        : "Negative";

    return {
      years: yearKeys,
      values: dataValues,
      growthRates: growth,
      insights: { latest, peak, avg, momentum },
    };
  }, [data]);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: `${title} (Total Value)`,
        data: values,
        borderColor: primaryColor,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, `${primaryColor}66`);
          gradient.addColorStop(1, `${primaryColor}00`);
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Growth Rate %",
        data: growthRates,
        type: "bar",
        backgroundColor: "rgba(148, 163, 184, 0.2)",
        borderColor: "rgba(148, 163, 184, 0.5)",
        borderWidth: 1,
        yAxisID: "y1",
        hidden: chartType === "doughnut",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", align: "end" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: { display: true, text: "Value" },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: false },
        title: { display: true, text: "YoY Growth %" },
      },
    },
  };

  if (loading) return <div className="loader">Syncing Data...</div>;

  if (error) {
    return (
      <div
        className="loader"
        style={{ color: "#ef4444", flexDirection: "column", gap: "20px" }}
      >
        <span style={{ fontSize: "3rem" }}>⚠️</span>
        <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>{error}</div>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "12px 24px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className="economic-intelligence-wrapper">
      <style>{`
        .economic-intelligence-wrapper { padding-top: 100px; background: #f8fafc; min-height: 100vh; }
        .dashboard-container { max-width: 1400px; margin: 0 auto; padding: 20px; font-family: 'Inter', sans-serif; }
        
        .dashboard-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; flex-wrap: wrap; gap: 20px; }
        .header-title h1 { font-size: 2.2rem; font-weight: 800; margin: 0; color: #0f172a; }
        .header-title p { color: #64748b; margin: 5px 0 0; }
        
        .control-panel { display: flex; gap: 15px; align-items: center; }
        .country-select { padding: 12px 20px; border-radius: 12px; border: 1px solid #e2e8f0; font-weight: 600; cursor: pointer; background: white; }

        .insight-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .insight-card { background: white; padding: 25px; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: 0.3s; }
        .insight-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        .insight-label { font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; }
        .insight-value { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin-top: 8px; }
        .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-top: 10px; }
        .positive { background: #dcfce7; color: #15803d; }
        .negative { background: #fee2e2; color: #b91c1c; }

        .chart-main-card { background: white; padding: 30px; border-radius: 24px; border: 1px solid #f1f5f9; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); }
        .chart-canvas-area { height: 500px; width: 100%; position: relative; }

        .loader { height: 100vh; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #64748b; }
      `}</style>

      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-title">
            <h1>
              {emoji} {country} {title}
            </h1>
            <p>{description}</p>
          </div>
          <div className="control-panel">
            <select
              className="country-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div
              className="btn-group"
              style={{
                display: "flex",
                background: "#f1f5f9",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              {["line", "bar", "doughnut"].map((t) => (
                <button
                  key={t}
                  onClick={() => setChartType(t)}
                  style={{
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    background: chartType === t ? "white" : "transparent",
                    color: chartType === t ? primaryColor : "#64748b",
                    boxShadow:
                      chartType === t ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="insight-grid">
          <div className="insight-card">
            <div className="insight-label">Latest Snapshot (2023)</div>
            <div className="insight-value">
              {insights.latest.toLocaleString()}
            </div>
            <div
              className={`status-badge ${insights.momentum === "Positive" ? "positive" : "negative"}`}
            >
              {insights.momentum === "Positive"
                ? "↑ Increasing Momentum"
                : "↓ Decreasing Momentum"}
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-label">Historical Peak</div>
            <div className="insight-value" style={{ color: "#10b981" }}>
              {insights.peak.toLocaleString()}
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#64748b",
                margin: "10px 0 0",
              }}
            >
              All-time high recorded in dataset.
            </p>
          </div>
          <div className="insight-card">
            <div className="insight-label">63-Year Average</div>
            <div className="insight-value">
              {insights.avg.toFixed(0).toLocaleString()}
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#64748b",
                margin: "10px 0 0",
              }}
            >
              Baseline performance since 1960.
            </p>
          </div>
        </div>

        <div className="chart-main-card">
          <div className="chart-canvas-area">
            {chartType === "line" && (
              <Line data={chartData} options={chartOptions} />
            )}
            {chartType === "bar" && (
              <Bar data={chartData} options={chartOptions} />
            )}
            {chartType === "doughnut" && (
              <Doughnut
                data={{
                  labels: years.slice(-10),
                  datasets: [
                    {
                      data: values.slice(-10),
                      backgroundColor: [
                        "#3b82f6",
                        "#60a5fa",
                        "#93c5fd",
                        "#bfdbfe",
                        "#2563eb",
                        "#1d4ed8",
                        "#1e40af",
                        "#1e3a8a",
                        "#172554",
                        "#0891b2",
                      ],
                    },
                  ],
                }}
                options={{ ...chartOptions, cutout: "70%" }}
              />
            )}
          </div>
        </div>

        <AIForecast
          years={years}
          values={values}
          indicator={title}
          primaryColor={primaryColor}
        />
      </div>
    </div>
  );
};

export default EconomicChart;
