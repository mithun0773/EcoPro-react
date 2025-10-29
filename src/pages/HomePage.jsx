import React, { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import FeedBackForm from "../components/FeedBackForm";
import CardSection from "../components/CardSection";
import "../App.css";

const HomePage = () => {
  const [inflation, setInflation] = useState(6.5); // %
  const [population, setPopulation] = useState(1400000000); // India ~1.4B
  const [birth, setBirth] = useState(18); // per 1000
  const [death, setDeath] = useState(7); // per 1000

  useEffect(() => {
    const interval = setInterval(() => {
      // simulate live updates
      setPopulation((prev) => prev + Math.floor(Math.random() * 1000));
      setInflation((prev) =>
        Number((prev + (Math.random() * 0.1 - 0.05)).toFixed(2))
      );
      setBirth((prev) =>
        Number((prev + (Math.random() * 0.1 - 0.05)).toFixed(2))
      );
      setDeath((prev) =>
        Number((prev + (Math.random() * 0.05 - 0.02)).toFixed(2))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ paddingBottom: "120px" }}>
      <h1 style={{ textAlign: "center", marginTop: "120px" }}>
        Welcome to <span style={{ color: "lightblue" }}>Ecopro</span> Dashboard
      </h1>

      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <StatsCard
          title="Population"
          value={population.toLocaleString()}
          unit=""
        />
        <StatsCard title="Inflation" value={inflation} unit="%" />
        <StatsCard title="Birth Rate" value={birth} unit="/1000" />
        <StatsCard title="Death Rate" value={death} unit="/1000" />
      </div>

      <CardSection />
      <FeedBackForm />
    </div>
  );
};

export default HomePage;
