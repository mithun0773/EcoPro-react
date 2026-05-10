// src/pages/AnalyticsPage.jsx
import React from "react";
import {
  Globe,
  ArrowLeft,
  TrendingUp,
  BarChart3,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Interactive3DGlobe from "../components/Interactive3DGlobe";
import EconomicHeatmap from "../components/EconomicHeatmap";
import DataExportCenter from "../components/DataExportCenter";

const AnalyticsPage = () => {
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
            <Globe size={36} color="#fff" />
          </div>
          <div>
            <h1 style={styles.pageTitle}>Global Analytics Dashboard</h1>
            <p style={styles.pageSubtitle}>
              Interactive 3D visualizations and data export tools
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={styles.contentContainer}>
        {/* Interactive 3D Globe */}
        <section style={styles.section}>
          <Interactive3DGlobe />
        </section>

        {/* Economic Heatmap */}
        <section style={styles.section}>
          <EconomicHeatmap />
        </section>

        {/* Data Export Center */}
        <section style={styles.section}>
          <DataExportCenter />
        </section>

        {/* Quick Actions - NAVIGATION TO OTHER PAGES */}
        <section style={styles.quickActionsSection}>
          <h2 style={styles.quickActionsTitle}>What's Next?</h2>
          <div style={styles.quickActionsGrid}>
            <div
              style={styles.actionCard}
              onClick={() => navigate("/forecast")}
            >
              <div style={{ ...styles.actionIcon, background: "#10b981" }}>
                <TrendingUp size={28} color="#fff" />
              </div>
              <h3 style={styles.actionTitle}>Forecast Future Trends</h3>
              <p style={styles.actionDescription}>
                Use AI to predict economic scenarios based on current data
              </p>
              <div style={styles.actionLink}>
                Go to Forecasting <ArrowRight size={16} />
              </div>
            </div>

            <div style={styles.actionCard} onClick={() => navigate("/builder")}>
              <div style={{ ...styles.actionIcon, background: "#8b5cf6" }}>
                <BarChart3 size={28} color="#fff" />
              </div>
              <h3 style={styles.actionTitle}>Build Custom Dashboard</h3>
              <p style={styles.actionDescription}>
                Create personalized dashboards with your preferred metrics
              </p>
              <div style={styles.actionLink}>
                Open Builder <ArrowRight size={16} />
              </div>
            </div>

            <div style={styles.actionCard} onClick={() => navigate("/tools")}>
              <div style={{ ...styles.actionIcon, background: "#f59e0b" }}>
                <Zap size={28} color="#fff" />
              </div>
              <h3 style={styles.actionTitle}>Interactive Tools</h3>
              <p style={styles.actionDescription}>
                Access voice assistant and advanced comparison features
              </p>
              <div style={styles.actionLink}>
                View Tools <ArrowRight size={16} />
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
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
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
  section: {
    marginBottom: "40px",
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

export default AnalyticsPage;
