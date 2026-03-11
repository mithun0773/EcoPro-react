import React from "react";

const AIInsightsPanel = ({ insights, loading }) => {
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>AI is analyzing economic data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🤖 AI Economic Insights</h2>
        <span style={styles.badge}>Live Analysis</span>
      </div>

      <div style={styles.insightsGrid}>
        {insights.map((insight, index) => (
          <div
            key={index}
            style={{
              ...styles.insightCard,
              borderLeft: `4px solid ${insight.color}`,
            }}
          >
            <div style={styles.insightHeader}>
              <span style={styles.icon}>{insight.icon}</span>
              <h3 style={styles.insightTitle}>{insight.title}</h3>
            </div>
            <p style={styles.insightMessage}>{insight.message}</p>
            <span
              style={{
                ...styles.insightType,
                background: `${insight.color}20`,
                color: insight.color,
              }}
            >
              {insight.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1400px",
    margin: "40px auto",
    padding: "0 20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "1.8rem",
    color: "#1e293b",
    margin: 0,
  },
  badge: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  insightsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  insightCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  insightHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  icon: {
    fontSize: "1.8rem",
  },
  insightTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1e293b",
    margin: 0,
  },
  insightMessage: {
    fontSize: "0.95rem",
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "12px",
  },
  insightType: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.75rem",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    padding: "40px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f4f6",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Add spinner animation
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(
      `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,
      styleSheet.cssRules.length,
    );
  } catch (e) {}
}

export default AIInsightsPanel;
