// src/pages/ToolsPage.jsx
import React from "react";
import {
  Zap,
  ArrowLeft,
  Globe,
  TrendingUp,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import VoiceAssistant from "../components/VoiceAssistant";
import CountryComparison from "../components/CountryComparision";

const ToolsPage = () => {
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
            <Zap size={36} color="#fff" />
          </div>
          <div>
            <h1 style={styles.pageTitle}>Interactive Tools</h1>
            <p style={styles.pageSubtitle}>
              Voice assistant, country comparison, and advanced analysis tools
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={styles.contentContainer}>
        {/* Tools Overview */}
        <div style={styles.overviewSection}>
          <div style={styles.overviewCard}>
            <div style={styles.overviewIcon}>🎤</div>
            <h3 style={styles.overviewTitle}>Voice Assistant</h3>
            <p style={styles.overviewText}>
              Ask questions using natural language and get instant economic
              insights
            </p>
          </div>
          <div style={styles.overviewCard}>
            <div style={styles.overviewIcon}>🌍</div>
            <h3 style={styles.overviewTitle}>Country Comparison</h3>
            <p style={styles.overviewText}>
              Compare economic performance across 195 countries with real data
            </p>
          </div>
        </div>

        {/* Voice Assistant */}
        <section style={styles.section}>
          <VoiceAssistant />
        </section>

        {/* Country Comparison */}
        <section style={styles.section}>
          <CountryComparison />
        </section>

        {/* Tips Section */}
        <div style={styles.tipsSection}>
          <h3 style={styles.tipsTitle}>💡 Pro Tips</h3>
          <div style={styles.tipsList}>
            <div style={styles.tipItem}>
              <span style={styles.tipBullet}>•</span>
              <span>
                Use Chrome or Edge browser for best voice recognition accuracy
              </span>
            </div>
            <div style={styles.tipItem}>
              <span style={styles.tipBullet}>•</span>
              <span>
                Compare up to 5 countries simultaneously for comprehensive
                analysis
              </span>
            </div>
            <div style={styles.tipItem}>
              <span style={styles.tipBullet}>•</span>
              <span>
                Enable microphone permissions when prompted for voice features
              </span>
            </div>
            <div style={styles.tipItem}>
              <span style={styles.tipBullet}>•</span>
              <span>
                Use specific country names for more accurate voice search
                results
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions - NAVIGATION TO OTHER PAGES */}
        <section style={styles.quickActionsSection}>
          <h2 style={styles.quickActionsTitle}>Explore More Features</h2>
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
                Visualize comparison data on interactive 3D globe
              </p>
              <div style={styles.actionLink}>
                View Analytics <ArrowRight size={16} />
              </div>
            </div>

            <div
              style={styles.actionCard}
              onClick={() => navigate("/forecast")}
            >
              <div style={{ ...styles.actionIcon, background: "#10b981" }}>
                <TrendingUp size={28} color="#fff" />
              </div>
              <h3 style={styles.actionTitle}>Forecast Trends</h3>
              <p style={styles.actionDescription}>
                Predict future economic scenarios for selected countries
              </p>
              <div style={styles.actionLink}>
                Start Forecasting <ArrowRight size={16} />
              </div>
            </div>

            <div style={styles.actionCard} onClick={() => navigate("/builder")}>
              <div style={{ ...styles.actionIcon, background: "#8b5cf6" }}>
                <BarChart3 size={28} color="#fff" />
              </div>
              <h3 style={styles.actionTitle}>Build Dashboard</h3>
              <p style={styles.actionDescription}>
                Create custom dashboards with comparison widgets
              </p>
              <div style={styles.actionLink}>
                Open Builder <ArrowRight size={16} />
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
    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(245, 158, 11, 0.3)",
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
  overviewSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    marginBottom: "40px",
  },
  overviewCard: {
    padding: "30px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  overviewIcon: {
    fontSize: "3rem",
    marginBottom: "15px",
  },
  overviewTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "10px",
  },
  overviewText: {
    fontSize: "1rem",
    color: "#64748b",
    lineHeight: "1.6",
  },
  section: {
    marginBottom: "40px",
  },
  tipsSection: {
    padding: "30px",
    background: "linear-gradient(135deg, #fef3c7, #fde68a)",
    borderRadius: "16px",
    border: "2px solid #fbbf24",
    marginBottom: "40px",
  },
  tipsTitle: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#78350f",
    marginBottom: "20px",
  },
  tipsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  tipItem: {
    display: "flex",
    gap: "12px",
    fontSize: "1rem",
    color: "#78350f",
    lineHeight: "1.6",
  },
  tipBullet: {
    fontWeight: "800",
    fontSize: "1.5rem",
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

export default ToolsPage;
