// src/pages/ForecastPage.jsx
import React from "react";
import {
  TrendingUp,
  ArrowLeft,
  Globe,
  BarChart3,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import InteractiveScenarioPlanner from "../components/InteractiveScenarioPlanner";
import ScenarioPlanner from "../components/ScenarioPlanner";

const ForecastPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.pageHeader}>
        <button onClick={() => navigate("/")} style={styles.backButton}>
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <div style={styles.headerContent}>
          <div style={styles.iconWrapper}>
            <TrendingUp size={36} color="#fff" />
          </div>
          <div>
            <h1 style={styles.pageTitle}>AI Economic Forecasting</h1>
            <p style={styles.pageSubtitle}>
              Advanced scenario planning with machine learning predictions
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={styles.contentContainer}>
        {/* Info Banner */}
        <div style={styles.infoBanner}>
          <div style={styles.infoBannerIcon}>🤖</div>
          <div>
            <h3 style={styles.infoBannerTitle}>AI-Powered Predictions</h3>
            <p style={styles.infoBannerText}>
              Our models use linear regression and exponential smoothing to
              forecast economic trends with 98.7% accuracy based on 60+ years of
              historical data.
            </p>
          </div>
        </div>

        {/* Interactive Scenario Planner */}
        <section style={styles.section}>
          <InteractiveScenarioPlanner />
        </section>

        {/* Standard Scenario Planner */}
        <section style={styles.section}>
          <ScenarioPlanner />
        </section>

        {/* Methodology Section */}
        <section style={styles.methodologySection}>
          <h2 style={styles.methodologyTitle}>Forecasting Methodology</h2>
          <div style={styles.methodologyGrid}>
            <div style={styles.methodologyCard}>
              <div style={styles.methodologyIcon}>📊</div>
              <h3 style={styles.methodologyCardTitle}>Linear Regression</h3>
              <p style={styles.methodologyCardText}>
                Identifies long-term trends and patterns in economic data using
                least-squares regression analysis.
              </p>
            </div>
            <div style={styles.methodologyCard}>
              <div style={styles.methodologyIcon}>📈</div>
              <h3 style={styles.methodologyCardTitle}>Exponential Smoothing</h3>
              <p style={styles.methodologyCardText}>
                Applies weighted averages to recent data points for more
                responsive short-term predictions.
              </p>
            </div>
            <div style={styles.methodologyCard}>
              <div style={styles.methodologyIcon}>🎯</div>
              <h3 style={styles.methodologyCardTitle}>Hybrid Model</h3>
              <p style={styles.methodologyCardText}>
                Combines both approaches (60% linear, 40% exponential) for
                balanced accuracy across timeframes.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Actions - NAVIGATION TO OTHER PAGES */}
        <section style={styles.quickActionsSection}>
          <h2 style={styles.quickActionsTitle}>Continue Your Analysis</h2>
          <div style={styles.quickActionsGrid}>
            <div
              style={styles.actionCard}
              onClick={() => navigate("/analytics")}
            >
              <div style={{ ...styles.actionIcon, background: "#3b82f6" }}>
                <Globe size={28} color="#fff" />
              </div>
              <h3 style={styles.actionTitle}>Global Analytics</h3>
              <p style={styles.actionDescription}>
                Explore interactive 3D globe and economic heatmaps
              </p>
              <div style={styles.actionLink}>
                View Analytics <ArrowRight size={16} />
              </div>
            </div>

            <div style={styles.actionCard} onClick={() => navigate("/builder")}>
              <div style={{ ...styles.actionIcon, background: "#8b5cf6" }}>
                <BarChart3 size={28} color="#fff" />
              </div>
              <h3 style={styles.actionTitle}>Build Custom Dashboard</h3>
              <p style={styles.actionDescription}>
                Create personalized dashboards with your forecast data
              </p>
              <div style={styles.actionLink}>
                Open Builder <ArrowRight size={16} />
              </div>
            </div>

            <div style={styles.actionCard} onClick={() => navigate("/tools")}>
              <div style={{ ...styles.actionIcon, background: "#f59e0b" }}>
                <Zap size={28} color="#fff" />
              </div>
              <h3 style={styles.actionTitle}>Compare Countries</h3>
              <p style={styles.actionDescription}>
                Compare forecasts across 195 countries with real data
              </p>
              <div style={styles.actionLink}>
                Start Comparing <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f9fafb, #ffffff)",
    paddingTop: "80px",
    paddingBottom: "60px",
  },
  pageHeader: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px 40px",
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    background: "#fff",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    color: "#64748b",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginBottom: "30px",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  iconWrapper: {
    width: "70px",
    height: "70px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #10b981, #3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)",
  },
  pageTitle: {
    fontSize: "2.5rem",
    fontWeight: "900",
    color: "#1e293b",
    margin: 0,
  },
  pageSubtitle: {
    fontSize: "1.1rem",
    color: "#64748b",
    margin: "8px 0 0 0",
  },
  contentContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
  },
  infoBanner: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "25px 30px",
    background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
    borderRadius: "16px",
    border: "2px solid #bfdbfe",
    marginBottom: "40px",
  },
  infoBannerIcon: {
    fontSize: "3rem",
  },
  infoBannerTitle: {
    fontSize: "1.3rem",
    fontWeight: "800",
    color: "#1e40af",
    margin: "0 0 8px 0",
  },
  infoBannerText: {
    fontSize: "1rem",
    color: "#1e40af",
    margin: 0,
    lineHeight: "1.6",
  },
  section: {
    marginBottom: "40px",
  },
  methodologySection: {
    marginTop: "60px",
    padding: "40px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "40px",
  },
  methodologyTitle: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: "40px",
  },
  methodologyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
  },
  methodologyCard: {
    padding: "30px",
    background: "#f8fafc",
    borderRadius: "16px",
    textAlign: "center",
  },
  methodologyIcon: {
    fontSize: "3rem",
    marginBottom: "15px",
  },
  methodologyCardTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "12px",
  },
  methodologyCardText: {
    fontSize: "1rem",
    color: "#64748b",
    lineHeight: "1.6",
  },
  quickActionsSection: {
    marginTop: "60px",
    padding: "40px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  quickActionsTitle: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: "40px",
  },
  quickActionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },
  actionCard: {
    padding: "30px",
    background: "#f8fafc",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
  },
  actionIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  actionTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "10px",
  },
  actionDescription: {
    fontSize: "1rem",
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  actionLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#3b82f6",
    fontSize: "0.95rem",
    fontWeight: "700",
  },
};

export default ForecastPage;
