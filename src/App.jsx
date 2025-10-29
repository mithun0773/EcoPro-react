import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Use BrowserRouter
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Inflation from "./pages/Inflation";
import Population from "./pages/Population";
import Footer from "./components/Footer";
import StatsCard from "./components/StatsCard";
import Chart from "./components/Chart";
import "./index.css";
import Health from "./pages/Health";
import "./App.css";
import Gdp from "./pages/Gdp";
import { Bird } from "lucide-react";
import Birth from "./pages/Birth";
import Employement from "./pages/Employment";
import Agri from "./pages/Agri";
import Fertility from "./pages/Fertility";

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
    <div>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <BrowserRouter>
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gdp" element={<Gdp />} />
              <Route path="/birth" element={<Birth />} />
              <Route path="/inflation" element={<Inflation />} />
              <Route path="/population" element={<Population />} />
              <Route path="/health" element={<Health />} />
              <Route path="/employement" element={<Employement />} />
              <Route path="/agri" element={<Agri />} />
              <Route path="/fertility" element={<Fertility />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
