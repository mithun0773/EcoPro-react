import React, { useEffect, useState } from "react";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Fertility = () => {
  const [fertilityData, setfertilityData] = useState([]);
  const [country, setCountry] = useState("India");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    Papa.parse("/data/fertility.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      beforeFirstChunk: (chunk) => {
        // Skip metadata lines before the header
        const lines = chunk.split("\n");
        const headerLineIndex = lines.findIndex((line) =>
          line.includes("Country Name")
        );
        return lines.slice(headerLineIndex).join("\n");
      },
      complete: (result) => {
        const data = result.data.filter((row) => row["Country Name"]);
        setCountries(data.map((row) => row["Country Name"]).sort());

        const indiaRow = data.find((row) => row["Country Name"] === "India");
        if (indiaRow) {
          setfertilityData(indiaRow);
        }
      },
    });
  }, []);

  useEffect(() => {
    Papa.parse("/data/fertility.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      beforeFirstChunk: (chunk) => {
        const lines = chunk.split("\n");
        const headerLineIndex = lines.findIndex((line) =>
          line.includes("Country Name")
        );
        return lines.slice(headerLineIndex).join("\n");
      },
      complete: (result) => {
        const data = result.data;
        const countryRow = data.find(
          (row) => row["Country Name"]?.trim() === country
        );
        if (countryRow) {
          setfertilityData(countryRow);
        } else {
          console.error("Country not found in data:", country);
        }
      },
    });
  }, [country]);

  // Extract years and fertility values (1960–2023)
  const years = Object.keys(fertilityData).filter(
    (key) => Number(key) >= 1960 && Number(key) <= 2023
  );
  const values = years.map(
    (year) => Number(fertilityData[year]?.replace(/,/g, "")) || 0
  );

  // Chart configurations
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  const barData = {
    labels: years,
    datasets: [
      {
        label: `fertility of ${country}`,
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
    ],
  };

  const lineData = {
    labels: years,
    datasets: [
      {
        label: `fertility Growth Trend of ${country}`,
        data: values,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: years.slice(-6),
    datasets: [
      {
        label: "Recent fertility Distribution",
        data: values.slice(-6),
        backgroundColor: [
          "#4f46e5",
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div
      style={{
        padding: "30px",
        textAlign: "center",
        paddingBottom: "120px",
        marginTop: "40px",
      }}
    >
      <h1>🌍 fertility Dashboard</h1>
      <p style={{ color: "#555" }}>
        Explore fertility growth trends of countries (1960–2023)
      </p>

      {/* Country Selector */}
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        style={{
          padding: "10px 15px",
          margin: "20px 0",
          borderRadius: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
        }}
      >
        {countries.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* Chart Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "25px",
          marginTop: "30px",
        }}
      >
        <div style={styles.card}>
          <h3>📦 Bar Chart — fertility by Year</h3>
          <Bar data={barData} options={chartOptions} />
        </div>

        <div style={styles.card}>
          <h3>📈 Line Chart — fertility Trend</h3>
          <Line data={lineData} options={chartOptions} />
        </div>

        <div style={styles.card}>
          <h3>🍩 Doughnut — Recent fertility (2018–2023)</h3>
          <Doughnut data={doughnutData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px",
  },
};

export default Fertility;
