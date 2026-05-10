// src/components/DashboardBuilder.jsx
import React, { useState, useEffect } from "react";
import {
  Layout,
  Plus,
  Trash2,
  GripVertical,
  Save,
  Eye,
  Settings,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Users,
  DollarSign,
} from "lucide-react";

const DashboardBuilder = () => {
  const [widgets, setWidgets] = useState([
    { id: 1, type: "gdp", position: 0, size: "large" },
    { id: 2, type: "inflation", position: 1, size: "medium" },
    { id: 3, type: "population", position: 2, size: "medium" },
  ]);

  const [draggedWidget, setDraggedWidget] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [liveData, setLiveData] = useState({
    gdp: 7.2,
    inflation: 5.4,
    population: 1.428,
    health: 3.5,
    employment: 68.5,
    forecast: 8.9,
  });

  const availableWidgets = [
    {
      type: "gdp",
      name: "GDP Growth",
      color: "#3b82f6",
      icon: TrendingUp,
      data: [5.2, 6.1, 6.8, 7.2, 7.8],
      unit: "%",
    },
    {
      type: "inflation",
      name: "Inflation Rate",
      color: "#ef4444",
      icon: TrendingDown,
      data: [7.8, 6.9, 6.2, 5.4, 4.8],
      unit: "%",
    },
    {
      type: "population",
      name: "Population",
      color: "#10b981",
      icon: Users,
      data: [1.38, 1.39, 1.41, 1.428, 1.44],
      unit: "B",
    },
    {
      type: "health",
      name: "Health Spend",
      color: "#ec4899",
      icon: Activity,
      data: [2.8, 3.0, 3.2, 3.5, 3.8],
      unit: "% GDP",
    },
    {
      type: "employment",
      name: "Employment Rate",
      color: "#8b5cf6",
      icon: BarChart3,
      data: [64.2, 65.8, 67.1, 68.5, 69.2],
      unit: "%",
    },
    {
      type: "forecast",
      name: "AI Forecast",
      color: "#06b6d4",
      icon: TrendingUp,
      data: [6.5, 7.2, 7.8, 8.5, 8.9],
      unit: "%",
    },
  ];

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData({
        gdp: +(7.2 + (Math.random() - 0.5) * 0.5).toFixed(2),
        inflation: +(5.4 + (Math.random() - 0.5) * 0.3).toFixed(2),
        population: +(1.428 + Math.random() * 0.001).toFixed(3),
        health: +(3.5 + (Math.random() - 0.5) * 0.2).toFixed(2),
        employment: +(68.5 + (Math.random() - 0.5) * 0.3).toFixed(1),
        forecast: +(8.9 + (Math.random() - 0.5) * 0.4).toFixed(2),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDragStart = (e, widget) => {
    setDraggedWidget(widget);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetPosition) => {
    e.preventDefault();

    if (!draggedWidget) return;

    const newWidgets = [...widgets];
    const draggedIndex = newWidgets.findIndex((w) => w.id === draggedWidget.id);

    if (draggedIndex !== -1) {
      const [removed] = newWidgets.splice(draggedIndex, 1);
      newWidgets.splice(targetPosition, 0, removed);
      newWidgets.forEach((w, i) => {
        w.position = i;
      });
      setWidgets(newWidgets);
    }

    setDraggedWidget(null);
  };

  const addWidget = (type) => {
    const newWidget = {
      id: Date.now(),
      type,
      position: widgets.length,
      size: "medium",
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  const changeWidgetSize = (id, size) => {
    setWidgets(widgets.map((w) => (w.id === id ? { ...w, size } : w)));
  };

  const saveDashboard = () => {
    localStorage.setItem("customDashboard", JSON.stringify(widgets));
    alert("✅ Dashboard layout saved successfully!");
  };

  const loadDashboard = () => {
    const saved = localStorage.getItem("customDashboard");
    if (saved) {
      setWidgets(JSON.parse(saved));
      alert("✅ Dashboard layout loaded!");
    } else {
      alert("❌ No saved dashboard found!");
    }
  };

  const renderMiniChart = (data, color) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    return (
      <svg width="100%" height="60" style={{ marginTop: "10px" }}>
        <defs>
          <linearGradient
            id={`gradient-${color}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        {/* Area */}
        <polygon
          points={
            data
              .map((val, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = 50 - ((val - min) / range) * 40;
                return `${x},${y}`;
              })
              .join(" ") + " 100,50 0,50"
          }
          fill={`url(#gradient-${color})`}
        />

        {/* Line */}
        <polyline
          points={data
            .map((val, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = 50 - ((val - min) / range) * 40;
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />

        {/* Dots */}
        {data.map((val, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 50 - ((val - min) / range) * 40;
          return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
        })}
      </svg>
    );
  };

  const renderWidget = (widget) => {
    const widgetInfo = availableWidgets.find((w) => w.type === widget.type);
    if (!widgetInfo) return null;

    const Icon = widgetInfo.icon;
    const currentValue = liveData[widget.type];
    const previousValue = widgetInfo.data[widgetInfo.data.length - 2];
    const change = (
      ((currentValue - previousValue) / previousValue) *
      100
    ).toFixed(1);
    const isPositive = change > 0;

    const sizeStyles = {
      small: { gridColumn: "span 1", minHeight: "250px" },
      medium: { gridColumn: "span 2", minHeight: "300px" },
      large: { gridColumn: "span 3", minHeight: "350px" },
    };

    return (
      <div
        key={widget.id}
        draggable={!previewMode}
        onDragStart={(e) => handleDragStart(e, widget)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, widget.position)}
        style={{
          ...styles.widget,
          ...sizeStyles[widget.size],
          borderColor: widgetInfo.color,
          opacity: draggedWidget?.id === widget.id ? 0.5 : 1,
        }}
        className="dashboard-widget"
      >
        {!previewMode && (
          <div style={styles.widgetControls}>
            <GripVertical
              size={18}
              color="#94a3b8"
              style={{ cursor: "grab" }}
            />
            <div style={styles.controlButtons}>
              <button
                onClick={() => changeWidgetSize(widget.id, "small")}
                style={{
                  ...styles.sizeButton,
                  background:
                    widget.size === "small" ? widgetInfo.color : "#fff",
                  color: widget.size === "small" ? "#fff" : "#64748b",
                }}
                title="Small"
              >
                S
              </button>
              <button
                onClick={() => changeWidgetSize(widget.id, "medium")}
                style={{
                  ...styles.sizeButton,
                  background:
                    widget.size === "medium" ? widgetInfo.color : "#fff",
                  color: widget.size === "medium" ? "#fff" : "#64748b",
                }}
                title="Medium"
              >
                M
              </button>
              <button
                onClick={() => changeWidgetSize(widget.id, "large")}
                style={{
                  ...styles.sizeButton,
                  background:
                    widget.size === "large" ? widgetInfo.color : "#fff",
                  color: widget.size === "large" ? "#fff" : "#64748b",
                }}
                title="Large"
              >
                L
              </button>
              <button
                onClick={() => removeWidget(widget.id)}
                style={styles.deleteButton}
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )}

        <div style={styles.widgetContent}>
          {/* Header */}
          <div style={styles.widgetHeader}>
            <div style={{ ...styles.iconBadge, background: widgetInfo.color }}>
              <Icon size={24} color="#fff" />
            </div>
            <div style={styles.widgetInfo}>
              <h3 style={styles.widgetTitle}>{widgetInfo.name}</h3>
              <div style={styles.liveIndicator}>
                <div style={styles.livePulse}></div>
                <span>Live</span>
              </div>
            </div>
          </div>

          {/* Current Value */}
          <div style={styles.valueSection}>
            <div style={styles.mainValue}>
              {currentValue}
              <span style={styles.unit}>{widgetInfo.unit}</span>
            </div>
            <div
              style={{
                ...styles.changeIndicator,
                color: isPositive ? "#10b981" : "#ef4444",
              }}
            >
              {isPositive ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              {isPositive ? "+" : ""}
              {change}%
            </div>
          </div>

          {/* Mini Chart */}
          <div style={styles.chartSection}>
            {renderMiniChart(
              [...widgetInfo.data, currentValue],
              widgetInfo.color,
            )}
          </div>

          {/* Stats */}
          <div style={styles.statsRow}>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Min</div>
              <div style={styles.statValue}>
                {Math.min(...widgetInfo.data).toFixed(1)}
              </div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Max</div>
              <div style={styles.statValue}>
                {Math.max(...widgetInfo.data).toFixed(1)}
              </div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Avg</div>
              <div style={styles.statValue}>
                {(
                  widgetInfo.data.reduce((a, b) => a + b, 0) /
                  widgetInfo.data.length
                ).toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerIcon}>
            <Layout size={32} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={styles.title}>Custom Dashboard Builder</h2>
            <p style={styles.subtitle}>
              Drag & drop widgets • Real-time data • Fully customizable
            </p>
          </div>
        </div>
        <div style={styles.headerButtons}>
          <button onClick={loadDashboard} style={styles.loadButton}>
            📂 Load
          </button>
          <button onClick={saveDashboard} style={styles.saveButton}>
            <Save size={18} />
            Save
          </button>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            style={{
              ...styles.previewButton,
              background: previewMode ? "#10b981" : "#64748b",
            }}
          >
            <Eye size={18} />
            {previewMode ? "Edit" : "Preview"}
          </button>
        </div>
      </div>

      {/* Widget Library */}
      {!previewMode && (
        <div style={styles.widgetLibrary}>
          <div style={styles.libraryHeader}>
            <Plus size={20} color="#3b82f6" />
            <h3 style={styles.libraryTitle}>Available Widgets</h3>
          </div>
          <div style={styles.libraryGrid}>
            {availableWidgets.map((widget) => {
              const Icon = widget.icon;
              return (
                <button
                  key={widget.type}
                  onClick={() => addWidget(widget.type)}
                  style={{
                    ...styles.libraryItem,
                    borderColor: widget.color,
                  }}
                  className="library-widget"
                >
                  <div
                    style={{ ...styles.libraryIcon, background: widget.color }}
                  >
                    <Icon size={20} color="#fff" />
                  </div>
                  <span style={styles.libraryName}>{widget.name}</span>
                  <Plus size={16} style={styles.libraryPlus} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Canvas */}
      <div style={styles.canvas}>
        {widgets.length === 0 ? (
          <div style={styles.emptyState}>
            <Layout size={64} color="#cbd5e1" />
            <h3 style={styles.emptyTitle}>Your dashboard is empty</h3>
            <p style={styles.emptyText}>
              Add widgets from the library above to get started
            </p>
          </div>
        ) : (
          <div style={styles.widgetGrid}>
            {widgets
              .sort((a, b) => a.position - b.position)
              .map((widget) => renderWidget(widget))}
          </div>
        )}
      </div>

      {/* Instructions */}
      {!previewMode && (
        <div style={styles.instructions}>
          <Settings size={20} color="#3b82f6" />
          <div style={styles.instructionsList}>
            <div style={styles.instructionItem}>
              <strong>Drag</strong> widgets to reorder
            </div>
            <div style={styles.instructionItem}>
              <strong>S/M/L</strong> buttons change size
            </div>
            <div style={styles.instructionItem}>
              <strong>Save</strong> to persist layout
            </div>
            <div style={styles.instructionItem}>
              <strong>Preview</strong> to hide controls
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    margin: "40px auto",
    maxWidth: "1600px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "25px",
    borderBottom: "2px solid rgba(255,255,255,0.5)",
    flexWrap: "wrap",
    gap: "20px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flex: 1,
  },
  headerIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1e293b",
    margin: 0,
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#64748b",
    margin: "5px 0 0 0",
  },
  headerButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  loadButton: {
    padding: "12px 20px",
    background: "#fff",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    fontSize: "0.95rem",
  },
  saveButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    fontSize: "0.95rem",
  },
  previewButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    fontSize: "0.95rem",
  },
  widgetLibrary: {
    marginBottom: "30px",
    padding: "25px",
    background: "#fff",
    borderRadius: "16px",
    border: "2px dashed #cbd5e1",
  },
  libraryHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  libraryTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  libraryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  },
  libraryItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    background: "#f8fafc",
    border: "2px solid",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  libraryIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  libraryName: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#1e293b",
    flex: 1,
  },
  libraryPlus: {
    color: "#94a3b8",
  },
  canvas: {
    minHeight: "500px",
    padding: "25px",
    background: "#fff",
    borderRadius: "16px",
    marginBottom: "25px",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#64748b",
    margin: "20px 0 10px",
  },
  emptyText: {
    fontSize: "1rem",
    color: "#94a3b8",
    margin: 0,
  },
  widgetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  widget: {
    background: "#fff",
    border: "3px solid",
    borderRadius: "16px",
    padding: "20px",
    cursor: "move",
    transition: "all 0.3s",
    position: "relative",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  widgetControls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "2px solid #f1f5f9",
  },
  controlButtons: {
    display: "flex",
    gap: "6px",
  },
  sizeButton: {
    width: "32px",
    height: "32px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.8rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  deleteButton: {
    width: "32px",
    height: "32px",
    background: "#fee2e2",
    border: "2px solid #fecaca",
    borderRadius: "8px",
    color: "#ef4444",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  widgetContent: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  widgetHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  iconBadge: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  widgetInfo: {
    flex: 1,
  },
  widgetTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 5px 0",
  },
  liveIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.75rem",
    color: "#64748b",
    fontWeight: "600",
  },
  livePulse: {
    width: "6px",
    height: "6px",
    background: "#10b981",
    borderRadius: "50%",
    animation: "pulse 2s infinite",
  },
  valueSection: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  mainValue: {
    fontSize: "2.5rem",
    fontWeight: "900",
    color: "#1e293b",
  },
  unit: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#64748b",
    marginLeft: "5px",
  },
  changeIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "1rem",
    fontWeight: "700",
  },
  chartSection: {
    marginTop: "10px",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "10px",
  },
  statItem: {
    textAlign: "center",
    padding: "10px",
    background: "#f8fafc",
    borderRadius: "8px",
  },
  statLabel: {
    fontSize: "0.7rem",
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: "4px",
  },
  statValue: {
    fontSize: "1.1rem",
    fontWeight: "800",
    color: "#1e293b",
  },
  instructions: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "12px",
    border: "1px solid rgba(59, 130, 246, 0.2)",
  },
  instructionsList: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  instructionItem: {
    fontSize: "0.9rem",
    color: "#1e40af",
  },
};

// Add CSS for hover effects
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(
      `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `,
      styleSheet.cssRules.length,
    );

    styleSheet.insertRule(
      `
      .library-widget:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      }
    `,
      styleSheet.cssRules.length,
    );

    styleSheet.insertRule(
      `
      .dashboard-widget:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px rgba(0,0,0,0.1);
      }
    `,
      styleSheet.cssRules.length,
    );
  } catch (e) {
    console.error("Error adding styles:", e);
  }
}

export default DashboardBuilder;
