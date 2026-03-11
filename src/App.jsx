import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EconomicChart from "./components/EconomicChart";
import "./index.css";
import "./App.css";

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "dark" ? "#121212" : "#f9f9f9";
    document.body.style.color = theme === "dark" ? "#f9f9f9" : "#121212";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/gdp"
              element={
                <EconomicChart
                  indicator="gdp"
                  title="GDP"
                  emoji="💰"
                  primaryColor="#4f46e5"
                  description="Gross Domestic Product Analysis (1960–2023)"
                />
              }
            />

            <Route
              path="/inflation"
              element={
                <EconomicChart
                  indicator="inflation"
                  title="Inflation"
                  emoji="📈"
                  primaryColor="#ef4444"
                  description="Consumer Price Index Trends (1960–2023)"
                />
              }
            />

            <Route
              path="/population"
              element={
                <EconomicChart
                  indicator="population"
                  title="Population"
                  emoji="👥"
                  primaryColor="#10b981"
                  description="Demographic Growth Patterns (1960–2023)"
                />
              }
            />

            <Route
              path="/health"
              element={
                <EconomicChart
                  indicator="health"
                  title="Health Expenditure"
                  emoji="❤️"
                  primaryColor="#ec4899"
                  description="Healthcare Spending Analysis (1960–2023)"
                />
              }
            />

            <Route
              path="/employement"
              element={
                <EconomicChart
                  indicator="employement"
                  title="Employment"
                  emoji="💼"
                  primaryColor="#3b82f6"
                  description="Labor Force Statistics (1960–2023)"
                />
              }
            />

            <Route
              path="/agri"
              element={
                <EconomicChart
                  indicator="agri"
                  title="Agriculture"
                  emoji="🌾"
                  primaryColor="#84cc16"
                  description="Agricultural Sector Metrics (1960–2023)"
                />
              }
            />

            <Route
              path="/fertility"
              element={
                <EconomicChart
                  indicator="fertility"
                  title="Fertility Rate"
                  emoji="👶"
                  primaryColor="#f59e0b"
                  description="Birth Rate Patterns (1960–2023)"
                />
              }
            />

            <Route
              path="/birth"
              element={
                <EconomicChart
                  indicator="birth"
                  title="Birth Rate"
                  emoji="🍼"
                  primaryColor="#8b5cf6"
                  description="Natality Trends (1960–2023)"
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;
