// src/components/DataExportCenter.jsx
import React, { useState } from "react";
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileImage,
  Check,
} from "lucide-react";

const DataExportCenter = () => {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [selectedData, setSelectedData] = useState({
    gdp: true,
    inflation: true,
    population: false,
    health: false,
  });
  const [dateRange, setDateRange] = useState({ from: "2020", to: "2023" });
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const formats = [
    { id: "pdf", name: "PDF Report", icon: FileText, color: "#ef4444" },
    {
      id: "excel",
      name: "Excel Spreadsheet",
      icon: FileSpreadsheet,
      color: "#10b981",
    },
    { id: "csv", name: "CSV Data", icon: FileText, color: "#3b82f6" },
    { id: "png", name: "Chart Image", icon: FileImage, color: "#f59e0b" },
  ];

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Download size={28} color="#3b82f6" />
        <div>
          <h2 style={styles.title}>Data Export Center</h2>
          <p style={styles.subtitle}>
            Download your economic insights in any format
          </p>
        </div>
      </div>

      <div style={styles.content}>
        {/* Format Selection */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Select Format</h3>
          <div style={styles.formatGrid}>
            {formats.map((format) => (
              <div
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                style={{
                  ...styles.formatCard,
                  ...(selectedFormat === format.id
                    ? styles.formatCardActive
                    : {}),
                  borderColor:
                    selectedFormat === format.id ? format.color : "#e2e8f0",
                }}
              >
                <format.icon size={32} color={format.color} />
                <div style={styles.formatName}>{format.name}</div>
                {selectedFormat === format.id && (
                  <Check
                    size={20}
                    color={format.color}
                    style={styles.checkIcon}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Data Selection */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Choose Indicators</h3>
          <div style={styles.checkboxGrid}>
            {Object.keys(selectedData).map((key) => (
              <label key={key} style={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={selectedData[key]}
                  onChange={(e) =>
                    setSelectedData({
                      ...selectedData,
                      [key]: e.target.checked,
                    })
                  }
                  style={styles.checkboxInput}
                />
                <span style={styles.checkboxLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Date Range</h3>
          <div style={styles.dateRange}>
            <div style={styles.dateInput}>
              <label style={styles.dateLabel}>From</label>
              <select
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange({ ...dateRange, from: e.target.value })
                }
                style={styles.select}
              >
                {Array.from({ length: 64 }, (_, i) => 1960 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.dateInput}>
              <label style={styles.dateLabel}>To</label>
              <select
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange({ ...dateRange, to: e.target.value })
                }
                style={styles.select}
              >
                {Array.from({ length: 64 }, (_, i) => 1960 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={exporting || exported}
          style={{
            ...styles.exportButton,
            ...(exporting ? styles.exportButtonLoading : {}),
            ...(exported ? styles.exportButtonSuccess : {}),
          }}
        >
          {exporting ? (
            <>
              <div style={styles.spinner}></div>
              Generating...
            </>
          ) : exported ? (
            <>
              <Check size={20} />
              Downloaded Successfully!
            </>
          ) : (
            <>
              <Download size={20} />
              Export Data
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    maxWidth: "800px",
    margin: "40px auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e2e8f0",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#64748b",
    margin: "5px 0 0 0",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  sectionTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1e293b",
    margin: 0,
  },
  formatGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
  },
  formatCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  formatCardActive: {
    background: "#f8fafc",
    transform: "translateY(-4px)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  },
  formatName: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
  },
  checkIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  checkboxGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  checkboxInput: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
  checkboxLabel: {
    fontSize: "0.95rem",
    color: "#1e293b",
    fontWeight: "500",
  },
  dateRange: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  dateInput: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  dateLabel: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#64748b",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    cursor: "pointer",
  },
  exportButton: {
    padding: "16px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s ease",
  },
  exportButtonLoading: {
    background: "#64748b",
    cursor: "not-allowed",
  },
  exportButtonSuccess: {
    background: "#10b981",
    cursor: "default",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default DataExportCenter;
