// src/pages/HomePage.jsx - ENHANCED 2D INTERACTIVE VERSION
import { useState, useEffect, useMemo, useRef } from "react";
import {
  TrendingUp,
  Zap,
  Globe,
  BarChart3,
  Users,
  Sparkles,
  ArrowRight,
  Play,
  ChevronDown,
  LineChart,
  Activity,
  DollarSign,
} from "lucide-react";
import StatsCard from "../components/StatsCard";
import FeedBackForm from "../components/FeedBackForm";
import CardSection from "../components/CardSection";
import AIInsightsPanel from "../components/AIInsightsPanel";
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
// import HeroGlobe from "../components/HeroGlobe"
import "../App.css";
import Footer from "../components/Footer";

const HomePage = () => {
  const [inflation, setInflation] = useState(6.5);
  const [population, setPopulation] = useState(1400000000);
  const [birth, setBirth] = useState(18);
  const [death, setDeath] = useState(7);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interactive particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * 0.5;
          particle.y -= Math.sin(angle) * 0.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mousePosition]);

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

 useEffect(() => {
   const generateInsightsData = () => {
     const newInsights = [];

     if (inflation > 7) {
       newInsights.push({
         type: "warning",
         title: "High Inflation Alert",
         message: `Current inflation rate of ${inflation.toFixed(1)}% exceeds optimal range.`,
         icon: "⚠️",
         color: "#ef4444",
       });
     } else if (inflation < 3) {
       newInsights.push({
         type: "info",
         title: "Low Inflation Signal",
         message: `Inflation at ${inflation.toFixed(1)}% suggests strong currency position.`,
         icon: "ℹ️",
         color: "#3b82f6",
       });
     } else {
       newInsights.push({
         type: "success",
         title: "Healthy Inflation Range",
         message: `Inflation rate of ${inflation.toFixed(1)}% indicates stable conditions.`,
         icon: "✅",
         color: "#10b981",
       });
     }

     const birthDeathRatio = (birth / death).toFixed(2);
     if (birthDeathRatio > 2.5) {
       newInsights.push({
         type: "trend",
         title: "Accelerated Growth",
         message: `Birth-to-death ratio of ${birthDeathRatio}:1 indicates robust expansion.`,
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
       message: `Population projected to reach ${(predictedPopulation / 1000000000).toFixed(2)}B by 2035.`,
       icon: "🔮",
       color: "#ec4899",
     });

     return newInsights;
   };

   const insights = generateInsightsData();
   setInsights(insights);
   setLoading(false);

   const insightInterval = setInterval(() => {
     const newInsights = generateInsightsData();
     setInsights(newInsights);
   }, 5000);

   return () => clearInterval(insightInterval);
 }, [inflation, birth, death, population]);

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

 const scrollToContent = () => {
   window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" });
 };

  return (
    <div style={styles.pageContainer}>
      {/* ===== ENHANCED 2D HERO SECTION ===== */}
      <section style={styles.heroSection}>
        {/* Interactive Particle Canvas */}
        <canvas ref={canvasRef} style={styles.particleCanvas} />

        {/* Gradient Overlay */}
        <div style={styles.gradientOverlay}></div>

        {/* Floating Cards Background */}
        <div style={styles.floatingCards}>
          <div style={{ ...styles.floatingCard, ...styles.card1 }}>
            <LineChart size={32} color="#3b82f6" />
            <div style={styles.cardTitle}>GDP Growth</div>
            <div style={styles.cardValue}>+7.2%</div>
          </div>
          <div style={{ ...styles.floatingCard, ...styles.card2 }}>
            <TrendingUp size={32} color="#10b981" />
            <div style={styles.cardTitle}>Market Index</div>
            <div style={styles.cardValue}>↑ 12.5K</div>
          </div>
          <div style={{ ...styles.floatingCard, ...styles.card3 }}>
            <BarChart3 size={32} color="#f59e0b" />
            <div style={styles.cardTitle}>Inflation</div>
            <div style={styles.cardValue}>5.4%</div>
          </div>
          <div style={{ ...styles.floatingCard, ...styles.card4 }}>
            <Activity size={32} color="#ec4899" />
            <div style={styles.cardTitle}>Employment</div>
            <div style={styles.cardValue}>68.5%</div>
          </div>
        </div>

        {/* Hero Content */}
        <div style={styles.heroContent}>
          {/* Animated Badge */}
          <div style={styles.heroBadge}>
            <Sparkles size={16} className="sparkle-icon" />
            <span>AI-Powered Economic Intelligence</span>
            <div style={styles.badgePulse}></div>
          </div>

          {/* Main Title with Typing Effect */}
          <h1 style={styles.heroTitle}>
            Welcome to{" "}
            <span style={styles.brandName}>
              <span style={styles.eco}>Eco</span>
              <span style={styles.pro}>Pro</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p style={styles.heroSubtitle}>
            Transform 60+ years of global economic data into actionable insights
            with advanced AI forecasting and real-time analytics
          </p>

          {/* Interactive Stats Cards */}
          <div style={styles.heroStatsCards}>
            <div style={styles.heroStatCard}>
              <div style={styles.statIcon}>
                <Globe size={28} color="#3b82f6" />
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>195+</div>
                <div style={styles.statLabel}>Countries</div>
              </div>
            </div>

            <div style={styles.heroStatCard}>
              <div style={styles.statIcon}>
                <TrendingUp size={28} color="#10b981" />
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>98.7%</div>
                <div style={styles.statLabel}>AI Accuracy</div>
              </div>
            </div>

            <div style={styles.heroStatCard}>
              <div style={styles.statIcon}>
                <Zap size={28} color="#f59e0b" />
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>60+</div>
                <div style={styles.statLabel}>Years Data</div>
              </div>
            </div>

            <div style={styles.heroStatCard}>
              <div style={styles.statIcon}>
                <BarChart3 size={28} color="#8b5cf6" />
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>Real-time</div>
                <div style={styles.statLabel}>Analytics</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={styles.heroCTA}>
            <button
              style={styles.primaryButton}
              onClick={scrollToContent}
              className="primary-button"
            >
              <Play size={20} />
              Explore Dashboard
              <ArrowRight size={20} />
            </button>
            <button style={styles.secondaryButton} className="secondary-button">
              <DollarSign size={20} />
              View Live Data
            </button>
          </div>

          {/* Features Highlight */}
          <div style={styles.featuresHighlight}>
            <div style={styles.featureItem}>
              <div style={styles.checkIcon}>✓</div>
              <span>AI-Powered Forecasting</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.checkIcon}>✓</div>
              <span>Real-time Market Data</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.checkIcon}>✓</div>
              <span>Interactive Visualizations</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button onClick={scrollToContent} style={styles.scrollIndicator}>
          <ChevronDown size={24} className="bounce-icon" />
          <span>Scroll to Explore</span>
        </button>
      </section>

      {/* ===== MARKET TICKER ===== */}
      <MarketTicker />



      {/* ===== LIVE MARKET TICKER ===== */}
      <LiveMarketTicker />

      {/* ===== LIVE STATS ===== */}
      <section style={styles.statsSection}>
        <div style={styles.sectionHeader}>
          <div style={styles.liveBadge}>
            <div style={styles.liveDot}></div>
            Live Data
          </div>
          <h2 style={styles.sectionTitle}>Real-Time Economic Indicators</h2>
        </div>
        <div style={styles.statsContainer}>
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </section>

      {/* AI Insights */}
      <AIInsightsPanel insights={insights} loading={loading} />

      {/* Voice Assistant */}
      <VoiceAssistant />

      {/* Interactive 3D Globe */}
      <Interactive3DGlobe />

      {/* Enhanced Country Comparison */}
      <CountryComparison />

      {/* Interactive Scenario Planner */}
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
      {/* Floating Chatbot */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        style={{
          ...styles.chatbotButton,
          transform: showChatbot ? "rotate(45deg)" : "rotate(0deg)",
        }}
        className="chatbot-button"
      >
        {showChatbot ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {showChatbot && (
        <div style={styles.chatbotModal}>
          <AIChatbot />
        </div>
      )}

      {/* Scroll to Top */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={styles.scrollTopButton}
          className="scroll-top-button"
        >
          ↑
        </button>
      )}
    </div>
  );
};

const styles = {
  pageContainer: {
    background: "#f9fafb",
    minHeight: "100vh",
  },

  // ===== HERO SECTION =====
  heroSection: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
  },
  particleCanvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
    zIndex: 2,
  },
  floatingCards: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 3,
  },
  floatingCard: {
    position: "absolute",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  card1: {
    top: "15%",
    left: "8%",
    animation: "float 6s ease-in-out infinite",
  },
  card2: {
    top: "25%",
    right: "10%",
    animation: "float 8s ease-in-out infinite 1s",
  },
  card3: {
    bottom: "20%",
    left: "12%",
    animation: "float 7s ease-in-out infinite 2s",
  },
  card4: {
    bottom: "30%",
    right: "8%",
    animation: "float 9s ease-in-out infinite 3s",
  },
  cardTitle: {
    fontSize: "0.85rem",
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "500",
  },
  cardValue: {
    fontSize: "1.5rem",
    color: "#fff",
    fontWeight: "800",
  },
  heroContent: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    maxWidth: "1000px",
    padding: "0 20px",
  },
  heroBadge: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 24px",
    background: "rgba(59, 130, 246, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    borderRadius: "50px",
    color: "#60a5fa",
    fontSize: "0.95rem",
    fontWeight: "600",
    marginBottom: "30px",
    animation: "fadeInDown 0.8s ease-out",
  },
  badgePulse: {
    position: "absolute",
    top: "50%",
    left: "12px",
    transform: "translateY(-50%)",
    width: "8px",
    height: "8px",
    background: "#3b82f6",
    borderRadius: "50%",
    animation: "pulse 2s infinite",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    fontWeight: "900",
    color: "#fff",
    lineHeight: "1.2",
    marginBottom: "25px",
    animation: "fadeInUp 0.8s ease-out 0.2s backwards",
  },
  brandName: {
    display: "inline-block",
  },
  eco: {
    color: "#fff",
  },
  pro: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    color: "#94a3b8",
    lineHeight: "1.7",
    marginBottom: "40px",
    maxWidth: "700px",
    margin: "0 auto 40px",
    animation: "fadeInUp 0.8s ease-out 0.4s backwards",
  },
  heroStatsCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
    animation: "fadeInUp 0.8s ease-out 0.6s backwards",
  },
  heroStatCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  statIcon: {
    width: "50px",
    height: "50px",
    background: "rgba(59, 130, 246, 0.1)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statContent: {
    textAlign: "center",
  },
  statValue: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "0.85rem",
    color: "#94a3b8",
    fontWeight: "500",
  },
  heroCTA: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "40px",
    animation: "fadeInUp 0.8s ease-out 0.8s backwards",
  },
  primaryButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 32px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "1.05rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
  },
  secondaryButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 32px",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    fontSize: "1.05rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  featuresHighlight: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    animation: "fadeInUp 0.8s ease-out 1s backwards",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#94a3b8",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  checkIcon: {
    width: "20px",
    height: "20px",
    background: "#10b981",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    color: "#fff",
    fontWeight: "800",
  },
  scrollIndicator: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "50px",
    padding: "12px 24px",
    color: "#94a3b8",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    zIndex: 10,
  },

  // ===== OTHER SECTIONS =====
  statsSection: {
    padding: "60px 20px",
    background: "#ffffff",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "40px",
  },
  liveBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    background: "#10b981",
    color: "#fff",
    borderRadius: "50px",
    fontSize: "0.85rem",
    fontWeight: "700",
    marginBottom: "15px",
  },
  liveDot: {
    width: "8px",
    height: "8px",
    background: "#fff",
    borderRadius: "50%",
    animation: "pulse 2s infinite",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1e293b",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  chatbotButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
    zIndex: 1000,
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chatbotModal: {
    position: "fixed",
    bottom: "110px",
    right: "30px",
    zIndex: 1001,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    borderRadius: "20px",
    animation: "slideUp 0.3s ease-out",
  },
  scrollTopButton: {
    position: "fixed",
    bottom: "30px",
    left: "30px",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    zIndex: 999,
    transition: "all 0.3s ease",
    animation: "fadeIn 0.3s ease-out",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default HomePage;
