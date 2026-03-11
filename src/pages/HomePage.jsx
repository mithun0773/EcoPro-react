import React, { useState, useEffect, useCallback, useMemo } from "react";
import StatsCard from "../components/StatsCard";
import FeedBackForm from "../components/FeedBackForm";
import CardSection from "../components/CardSection";
import AIInsightsPanel from "../components/AIInsightsPanel";
import "../App.css";

const HomePage = () => {
  const [inflation, setInflation] = useState(6.5);
  const [population, setPopulation] = useState(1400000000);
  const [birth, setBirth] = useState(18);
  const [death, setDeath] = useState(7);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPopulation((prev) => prev + Math.floor(Math.random() * 1000));
      setInflation((prev) =>
        Number((prev + (Math.random() * 0.1 - 0.05)).toFixed(2)),
      );
      setBirth((prev) =>
        Number((prev + (Math.random() * 0.1 - 0.05)).toFixed(2)),
      );
      setDeath((prev) =>
        Number((prev + (Math.random() * 0.05 - 0.02)).toFixed(2)),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const generateInsights = useCallback(() => {
    const newInsights = [];

    if (inflation > 7) {
      newInsights.push({
        type: "warning",
        title: "High Inflation Alert",
        message: `Current inflation rate of ${inflation.toFixed(1)}% exceeds optimal range. This may impact purchasing power and economic growth.`,
        icon: "⚠️",
        color: "#ef4444",
      });
    } else if (inflation < 3) {
      newInsights.push({
        type: "info",
        title: "Low Inflation Signal",
        message: `Inflation at ${inflation.toFixed(1)}% suggests potential deflation risk or strong currency position.`,
        icon: "ℹ️",
        color: "#3b82f6",
      });
    } else {
      newInsights.push({
        type: "success",
        title: "Healthy Inflation Range",
        message: `Inflation rate of ${inflation.toFixed(1)}% indicates stable economic conditions and balanced monetary policy.`,
        icon: "✅",
        color: "#10b981",
      });
    }

    const birthDeathRatio = (birth / death).toFixed(2);
    if (birthDeathRatio > 2.5) {
      newInsights.push({
        type: "trend",
        title: "Accelerated Growth Pattern",
        message: `Birth-to-death ratio of ${birthDeathRatio}:1 indicates robust demographic expansion. Infrastructure planning recommended.`,
        icon: "📈",
        color: "#8b5cf6",
      });
    }

    const growthRate = ((birth - death) / 1000) * 100;
    const predictedPopulation = Math.floor(
      population * Math.pow(1 + growthRate / 100, 10),
    );
    newInsights.push({
      type: "prediction",
      title: "AI 10-Year Forecast",
      message: `Based on ${growthRate.toFixed(2)}% annual growth, population projected to reach ${(predictedPopulation / 1000000000).toFixed(2)}B by 2035.`,
      icon: "🔮",
      color: "#ec4899",
    });

    return newInsights;
  }, [inflation, birth, death, population]);

  useEffect(() => {
    const insights = generateInsights();
    setInsights(insights);
    setLoading(false);

    const insightInterval = setInterval(() => {
      const newInsights = generateInsights();
      setInsights(newInsights);
    }, 5000);

    return () => clearInterval(insightInterval);
  }, [generateInsights]);

  const statsData = useMemo(
    () => [
      {
        title: "Population",
        value: population.toLocaleString(),
        unit: "",
        trend: "up",
        change: "+0.12%",
      },
      {
        title: "Inflation",
        value: inflation,
        unit: "%",
        trend: inflation > 6 ? "up" : "down",
        change: inflation > 6 ? "+0.3%" : "-0.1%",
      },
      {
        title: "Birth Rate",
        value: birth,
        unit: "/1000",
        trend: "stable",
        change: "±0.05",
      },
      {
        title: "Death Rate",
        value: death,
        unit: "/1000",
        trend: "down",
        change: "-0.02%",
      },
    ],
    [population, inflation, birth, death],
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.heroSection}>
        <h1 style={styles.title}>
          Welcome to <span style={styles.brandName}>EcoPro</span> Dashboard
        </h1>
        <p style={styles.subtitle}>
          🤖 AI-Powered Economic Intelligence • 📊 Real-time Analytics • 🔮
          Predictive Insights
        </p>
      </div>

      <div style={styles.statsContainer}>
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <AIInsightsPanel insights={insights} loading={loading} />

      <CardSection />

      <FeedBackForm />
    </div>
  );
};

const styles = {
  pageContainer: {
    paddingBottom: "120px",
    background: "linear-gradient(to bottom, #f9fafb, #ffffff)",
    minHeight: "100vh",
  },
  heroSection: {
    textAlign: "center",
    marginTop: "100px",
    marginBottom: "40px",
    padding: "40px 20px",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "700",
    margin: "0 0 15px",
    color: "#1e293b",
  },
  brandName: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "800",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#64748b",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  statsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "0 20px",
    marginBottom: "40px",
  },
};

export default HomePage;
