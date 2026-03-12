// // src/pages/HomePage.jsx - COMPLETE ENHANCED VERSION
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import StatsCard from "../components/StatsCard";
// import FeedBackForm from "../components/FeedBackForm";
// import CardSection from "../components/CardSection";
// import AIInsightsPanel from "../components/AIInsightsPanel";
// import HeroGlobe from "../components/HeroGlobe";
// import MarketTicker from "../components/MarketTicker";
// import CountryComparison from "../components/CountryComparision";
// import AIChatbot from "../components/AIChatbot";
// import DataExportCenter from "../components/DataExportCenter";
// import EconomicHeatmap from "../components/EconomicHeatmap";
// import ScenarioPlanner from "../components/ScenarioPlanner";
// import Interactive3DGlobe from "../components/Interactive3DGlobe";
// import InteractiveScenarioPlanner  from "../components/InteractiveScenarioPlanner";

// import "../App.css";

// const HomePage = () => {
//   const [inflation, setInflation] = useState(6.5);
//   const [population, setPopulation] = useState(1400000000);
//   const [birth, setBirth] = useState(18);
//   const [death, setDeath] = useState(7);
//   const [insights, setInsights] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showChatbot, setShowChatbot] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPopulation((prev) => prev + Math.floor(Math.random() * 1000));
//       setInflation((prev) =>
//         Number((prev + (Math.random() * 0.1 - 0.05)).toFixed(2)),
//       );
//       setBirth((prev) =>
//         Number((prev + (Math.random() * 0.1 - 0.05)).toFixed(2)),
//       );
//       setDeath((prev) =>
//         Number((prev + (Math.random() * 0.05 - 0.02)).toFixed(2)),
//       );
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   const generateInsights = useCallback(() => {
//     const newInsights = [];

//     if (inflation > 7) {
//       newInsights.push({
//         type: "warning",
//         title: "High Inflation Alert",
//         message: `Current inflation rate of ${inflation.toFixed(1)}% exceeds optimal range. This may impact purchasing power and economic growth.`,
//         icon: "⚠️",
//         color: "#ef4444",
//       });
//     } else if (inflation < 3) {
//       newInsights.push({
//         type: "info",
//         title: "Low Inflation Signal",
//         message: `Inflation at ${inflation.toFixed(1)}% suggests potential deflation risk or strong currency position.`,
//         icon: "ℹ️",
//         color: "#3b82f6",
//       });
//     } else {
//       newInsights.push({
//         type: "success",
//         title: "Healthy Inflation Range",
//         message: `Inflation rate of ${inflation.toFixed(1)}% indicates stable economic conditions and balanced monetary policy.`,
//         icon: "✅",
//         color: "#10b981",
//       });
//     }

//     const birthDeathRatio = (birth / death).toFixed(2);
//     if (birthDeathRatio > 2.5) {
//       newInsights.push({
//         type: "trend",
//         title: "Accelerated Growth Pattern",
//         message: `Birth-to-death ratio of ${birthDeathRatio}:1 indicates robust demographic expansion. Infrastructure planning recommended.`,
//         icon: "📈",
//         color: "#8b5cf6",
//       });
//     }

//     const growthRate = ((birth - death) / 1000) * 100;
//     const predictedPopulation = Math.floor(
//       population * Math.pow(1 + growthRate / 100, 10),
//     );
//     newInsights.push({
//       type: "prediction",
//       title: "AI 10-Year Forecast",
//       message: `Based on ${growthRate.toFixed(2)}% annual growth, population projected to reach ${(predictedPopulation / 1000000000).toFixed(2)}B by 2035.`,
//       icon: "🔮",
//       color: "#ec4899",
//     });

//     return newInsights;
//   }, [inflation, birth, death, population]);

//   useEffect(() => {
//     const insights = generateInsights();
//     setInsights(insights);
//     setLoading(false);

//     const insightInterval = setInterval(() => {
//       const newInsights = generateInsights();
//       setInsights(newInsights);
//     }, 5000);

//     return () => clearInterval(insightInterval);
//   }, [generateInsights]);

//   const statsData = useMemo(
//     () => [
//       {
//         title: "Population",
//         value: population.toLocaleString(),
//         unit: "",
//         trend: "up",
//         change: "+0.12%",
//       },
//       {
//         title: "Inflation",
//         value: inflation,
//         unit: "%",
//         trend: inflation > 6 ? "up" : "down",
//         change: inflation > 6 ? "+0.3%" : "-0.1%",
//       },
//       {
//         title: "Birth Rate",
//         value: birth,
//         unit: "/1000",
//         trend: "stable",
//         change: "±0.05",
//       },
//       {
//         title: "Death Rate",
//         value: death,
//         unit: "/1000",
//         trend: "down",
//         change: "-0.02%",
//       },
//     ],
//     [population, inflation, birth, death],
//   );

//   return (
//     <div style={styles.pageContainer}>
//       {/* Hero Section with Animated Background */}
//       <HeroGlobe />

//       {/* Market Ticker */}
//       <MarketTicker />

//       {/* Live Stats Grid */}
//       <div style={styles.statsContainer}>
//         {statsData.map((stat, index) => (
//           <StatsCard key={index} {...stat} />
//         ))}
//       </div>

//       {/* AI Insights */}
//       <AIInsightsPanel insights={insights} loading={loading} />

//       {/* Country Comparison */}
//       <CountryComparison />

//       {/* Economic Heatmap */}
//       <EconomicHeatmap />


//       {/* Scenario Planner */}
//       <InteractiveScenarioPlanner />

//       {/* Data Export Center */}
//       <DataExportCenter />
// <Interactive3DGlobe />
//       {/* Card Sections */}
//       <CardSection />

//       {/* Feedback Form */}
//       <FeedBackForm />

//       {/* Floating Chatbot Button */}
//       <button
//         onClick={() => setShowChatbot(!showChatbot)}
//         style={styles.chatbotButton}
//       >
//         💬
//       </button>

//       {/* Chatbot Modal */}
//       {showChatbot && (
//         <div style={styles.chatbotModal}>
//           <button
//             onClick={() => setShowChatbot(false)}
//             style={styles.closeButton}
//           >
//             ✕
//           </button>
//           <AIChatbot />
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     paddingBottom: "120px",
//     background: "linear-gradient(to bottom, #f9fafb, #ffffff)",
//     minHeight: "100vh",
//   },
//   statsContainer: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     gap: "20px",
//     padding: "40px 20px",
//     maxWidth: "1400px",
//     margin: "0 auto",
//   },
//   chatbotButton: {
//     position: "fixed",
//     bottom: "30px",
//     right: "30px",
//     width: "60px",
//     height: "60px",
//     borderRadius: "50%",
//     background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
//     color: "#fff",
//     border: "none",
//     fontSize: "1.5rem",
//     cursor: "pointer",
//     boxShadow: "0 8px 16px rgba(59, 130, 246, 0.3)",
//     zIndex: 1000,
//     transition: "all 0.3s",
//   },
//   chatbotModal: {
//     position: "fixed",
//     bottom: "100px",
//     right: "30px",
//     zIndex: 1001,
//     boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
//     borderRadius: "16px",
//   },
//   closeButton: {
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     width: "30px",
//     height: "30px",
//     borderRadius: "50%",
//     background: "rgba(0,0,0,0.2)",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "1.2rem",
//     zIndex: 1002,
//   },
// };

// export default HomePage;
// src/pages/HomePage.jsx - ULTRA-INTERACTIVE VERSION
import React, { useState, useEffect, useCallback, useMemo } from "react";
import StatsCard from "../components/StatsCard";
import FeedBackForm from "../components/FeedBackForm";
import CardSection from "../components/CardSection";
import AIInsightsPanel from "../components/AIInsightsPanel";
import HeroGlobe from "../components/HeroGlobe";
import MarketTicker from "../components/MarketTicker";
import CountryComparison from "../components/CountryComparision";
import AIChatbot from "../components/AIChatbot";
import DataExportCenter from "../components/DataExportCenter";
import EconomicHeatmap from "../components/EconomicHeatmap";
import ScenarioPlanner from "../components/ScenarioPlanner";
import Interactive3DGlobe from "../components/Interactive3DGlobe";
import InteractiveScenarioPlanner from "../components/InteractiveScenarioPlanner";
import LiveMarketTicker from "../components/LiveMarketTicker";
import DashboardBuilder from "../components/DashboardBuilder";
import VoiceAssistant from "../components/VoiceAssistant";
import { MessageCircle, X } from "lucide-react";
import "../App.css";

const HomePage = () => {
  const [inflation, setInflation] = useState(6.5);
  const [population, setPopulation] = useState(1400000000);
  const [birth, setBirth] = useState(18);
  const [death, setDeath] = useState(7);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
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
        color: "#ef4444"
      });
    } else if (inflation < 3) {
      newInsights.push({
        type: "info",
        title: "Low Inflation Signal",
        message: `Inflation at ${inflation.toFixed(1)}% suggests potential deflation risk or strong currency position.`,
        icon: "ℹ️",
        color: "#3b82f6"
      });
    } else {
      newInsights.push({
        type: "success",
        title: "Healthy Inflation Range",
        message: `Inflation rate of ${inflation.toFixed(1)}% indicates stable economic conditions and balanced monetary policy.`,
        icon: "✅",
        color: "#10b981"
      });
    }

    const birthDeathRatio = (birth / death).toFixed(2);
    if (birthDeathRatio > 2.5) {
      newInsights.push({
        type: "trend",
        title: "Accelerated Growth Pattern",
        message: `Birth-to-death ratio of ${birthDeathRatio}:1 indicates robust demographic expansion. Infrastructure planning recommended.`,
        icon: "📈",
        color: "#8b5cf6"
      });
    }

    const growthRate = ((birth - death) / 1000) * 100;
    const predictedPopulation = Math.floor(population * Math.pow(1 + growthRate / 100, 10));
    newInsights.push({
      type: "prediction",
      title: "AI 10-Year Forecast",
      message: `Based on ${growthRate.toFixed(2)}% annual growth, population projected to reach ${(predictedPopulation / 1000000000).toFixed(2)}B by 2035.`,
      icon: "🔮",
      color: "#ec4899"
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

  const statsData = useMemo(() => [
    {
      title: "Population",
      value: population.toLocaleString(),
      unit: "",
      trend: "up",
      change: "+0.12%"
    },
    {
      title: "Inflation",
      value: inflation,
      unit: "%",
      trend: inflation > 6 ? "up" : "down",
      change: inflation > 6 ? "+0.3%" : "-0.1%"
    },
    {
      title: "Birth Rate",
      value: birth,
      unit: "/1000",
      trend: "stable",
      change: "±0.05"
    },
    {
      title: "Death Rate",
      value: death,
      unit: "/1000",
      trend: "down",
      change: "-0.02%"
    }
  ], [population, inflation, birth, death]);

  return (
    <div style={styles.pageContainer}>
      {/* Animated Hero with Particles */}
      <HeroGlobe />

      {/* Live Market Ticker */}
      <LiveMarketTicker />

      {/* Live Stats Grid */}
      <div style={styles.statsContainer}>
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* AI Insights */}
      <AIInsightsPanel insights={insights} loading={loading} />

      {/* Voice Assistant */}
      <VoiceAssistant />

      {/* Interactive 3D Globe */}
      <Interactive3DGlobe />

      {/* Enhanced Country Comparison with 195 countries */}
      <CountryComparison />

      {/* Interactive Scenario Planner with Sliders */}
      <InteractiveScenarioPlanner />

      {/* Dashboard Builder */}
      <DashboardBuilder />

      {/* Economic Heatmap */}
      <EconomicHeatmap />

      {/* Original Scenario Planner */}
      <ScenarioPlanner />

      {/* Data Export Center */}
      <DataExportCenter />

      {/* Card Sections */}
      <CardSection />

      {/* Feedback Form */}
      <FeedBackForm />

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        style={{
          ...styles.chatbotButton,
          transform: showChatbot ? "rotate(45deg)" : "rotate(0deg)",
        }}
      >
        {showChatbot ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chatbot Modal */}
      {showChatbot && (
        <div style={styles.chatbotModal}>
          <AIChatbot />
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={styles.scrollTopButton}
      >
        ↑
      </button>
    </div>
  );
};

const styles = {
  pageContainer: {
    paddingBottom: "120px",
    background: "linear-gradient(to bottom, #f9fafb, #ffffff)",
    minHeight: "100vh",
  },
  statsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "40px 20px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  chatbotButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    boxShadow: "0 8px 16px rgba(59, 130, 246, 0.3)",
    zIndex: 1000,
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chatbotModal: {
    position: "fixed",
    bottom: "100px",
    right: "30px",
    zIndex: 1001,
    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
    borderRadius: "16px",
    animation: "slideUp 0.3s ease-out",
  },
  scrollTopButton: {
    position: "fixed",
    bottom: "100px",
    right: "30px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 999,
    transition: "all 0.3s",
  },
};

// Add slide-up animation
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(`
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `, styleSheet.cssRules.length);
  } catch (e) {}
}

export default HomePage;