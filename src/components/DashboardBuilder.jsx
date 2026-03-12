// src/components/DashboardBuilder.jsx
import React, { useState } from "react";
import {
  Layout,
  Plus,
  Trash2,
  GripVertical,
  Save,
  Eye,
  Settings,
} from "lucide-react";

const DashboardBuilder = () => {
  const [widgets, setWidgets] = useState([
    { id: 1, type: "gdp", position: 0, size: "large" },
    { id: 2, type: "inflation", position: 1, size: "medium" },
    { id: 3, type: "population", position: 2, size: "medium" },
  ]);

  const [draggedWidget, setDraggedWidget] = useState(null);
  const [availableWidgets] = useState([
    { type: "gdp", name: "GDP Chart", color: "#3b82f6", icon: "💰" },
    { type: "inflation", name: "Inflation Rate", color: "#ef4444", icon: "📈" },
    { type: "population", name: "Population", color: "#10b981", icon: "👥" },
    { type: "health", name: "Health Spend", color: "#ec4899", icon: "❤️" },
    { type: "employment", name: "Employment", color: "#8b5cf6", icon: "💼" },
    {
      type: "comparison",
      name: "Country Comparison",
      color: "#f59e0b",
      icon: "⚖️",
    },
    { type: "forecast", name: "AI Forecast", color: "#06b6d4", icon: "🔮" },
    { type: "heatmap", name: "Global Heatmap", color: "#84cc16", icon: "🗺️" },
  ]);

  const [previewMode, setPreviewMode] = useState(false);

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
      // Reordering existing widget
      const [removed] = newWidgets.splice(draggedIndex, 1);
      newWidgets.splice(targetPosition, 0, removed);

      // Update positions
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
    }
  };

  const renderWidget = (widget) => {
    const widgetInfo = availableWidgets.find((w) => w.type === widget.type);
    if (!widgetInfo) return null;

    const sizeStyles = {
      small: { gridColumn: "span 1", minHeight: "200px" },
      medium: { gridColumn: "span 2", minHeight: "300px" },
      large: { gridColumn: "span 3", minHeight: "400px" },
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
                    widget.size === "small" ? widgetInfo.color : "transparent",
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
                    widget.size === "medium" ? widgetInfo.color : "transparent",
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
                    widget.size === "large" ? widgetInfo.color : "transparent",
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
          <div style={styles.widgetIcon}>{widgetInfo.icon}</div>
          <h3 style={styles.widgetTitle}>{widgetInfo.name}</h3>
          <div style={styles.widgetPlaceholder}>
            <div
              style={{ ...styles.placeholderBar, background: widgetInfo.color }}
            ></div>
            <div
              style={{
                ...styles.placeholderBar,
                background: widgetInfo.color,
                opacity: 0.7,
              }}
            ></div>
            <div
              style={{
                ...styles.placeholderBar,
                background: widgetInfo.color,
                opacity: 0.5,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Layout size={32} color="#3b82f6" />
        <div style={{ flex: 1 }}>
          <h2 style={styles.title}>Custom Dashboard Builder</h2>
          <p style={styles.subtitle}>
            Drag & drop widgets to create your personalized economic dashboard
          </p>
        </div>
        <div style={styles.headerButtons}>
          <button onClick={loadDashboard} style={styles.loadButton}>
            📂 Load Saved
          </button>
          <button onClick={saveDashboard} style={styles.saveButton}>
            <Save size={18} />
            Save Layout
          </button>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            style={{
              ...styles.previewButton,
              background: previewMode ? "#10b981" : "#64748b",
            }}
          >
            <Eye size={18} />
            {previewMode ? "Edit Mode" : "Preview"}
          </button>
        </div>
      </div>

      {!previewMode && (
        <div style={styles.widgetLibrary}>
          <div style={styles.libraryHeader}>
            <Plus size={20} />
            <h3 style={styles.libraryTitle}>Available Widgets</h3>
          </div>
          <div style={styles.libraryGrid}>
            {availableWidgets.map((widget) => (
              <button
                key={widget.type}
                onClick={() => addWidget(widget.type)}
                style={{
                  ...styles.libraryItem,
                  borderColor: widget.color,
                }}
              >
                <span style={styles.libraryIcon}>{widget.icon}</span>
                <span style={styles.libraryName}>{widget.name}</span>
                <Plus size={16} style={styles.libraryPlus} />
              </button>
            ))}
          </div>
        </div>
      )}

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

      {!previewMode && (
        <div style={styles.instructions}>
          <Settings size={20} color="#3b82f6" />
          <div style={styles.instructionsList}>
            <div style={styles.instructionItem}>
              <strong>Drag</strong> widgets to reorder
            </div>
            <div style={styles.instructionItem}>
              <strong>S/M/L</strong> to change size
            </div>
            <div style={styles.instructionItem}>
              <strong>Save</strong> to persist layout
            </div>
            <div style={styles.instructionItem}>
              <strong>Preview</strong> to see final result
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    margin: "40px auto",
    maxWidth: "1600px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f1f5f9",
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
  },
  loadButton: {
    padding: "10px 20px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  saveButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  previewButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  widgetLibrary: {
    marginBottom: "30px",
    padding: "25px",
    background: "#f8fafc",
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
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "12px",
  },
  libraryItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    background: "#fff",
    border: "2px solid",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s",
    position: "relative",
    overflow: "hidden",
  },
  libraryIcon: {
    fontSize: "1.5rem",
  },
  libraryName: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#1e293b",
    flex: 1,
  },
  libraryPlus: {
    color: "#94a3b8",
  },
  canvas: {
    minHeight: "500px",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "16px",
    marginBottom: "20px",
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
    borderRadius: "12px",
    padding: "20px",
    cursor: "move",
    transition: "all 0.3s",
    position: "relative",
  },
  widgetControls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "1px solid #f1f5f9",
  },
  controlButtons: {
    display: "flex",
    gap: "6px",
  },
  sizeButton: {
    width: "28px",
    height: "28px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  deleteButton: {
    width: "28px",
    height: "28px",
    background: "#fee2e2",
    border: "1px solid #fecaca",
    borderRadius: "6px",
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
    alignItems: "center",
    gap: "15px",
  },
  widgetIcon: {
    fontSize: "3rem",
  },
  widgetTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  widgetPlaceholder: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "10px",
  },
  placeholderBar: {
    height: "20px",
    borderRadius: "4px",
  },
  instructions: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    background: "#eff6ff",
    borderRadius: "12px",
    border: "1px solid #dbeafe",
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

export default DashboardBuilder;
