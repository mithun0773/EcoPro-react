// src/components/Interactive3DGlobe.jsx
import React, { useState, useEffect, useRef } from "react";
import { Globe, Search, TrendingUp, TrendingDown, Zap } from "lucide-react";

const Interactive3DGlobe = () => {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("gdp");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });

  // Real country coordinates and data
  const countries = [
    {
      name: "India",
      lat: 20,
      lng: 77,
      gdp: 3.7,
      growth: 7.2,
      inflation: 5.4,
      pop: 1400,
    },
    {
      name: "China",
      lat: 35,
      lng: 105,
      gdp: 18.5,
      growth: 4.9,
      inflation: 2.1,
      pop: 1400,
    },
    {
      name: "United States",
      lat: 38,
      lng: -97,
      gdp: 26.9,
      growth: 2.1,
      inflation: 3.2,
      pop: 335,
    },
    {
      name: "Brazil",
      lat: -10,
      lng: -55,
      gdp: 2.1,
      growth: 2.9,
      inflation: 4.6,
      pop: 215,
    },
    {
      name: "Germany",
      lat: 51,
      lng: 10,
      gdp: 4.3,
      growth: 0.3,
      inflation: 3.8,
      pop: 84,
    },
    {
      name: "Japan",
      lat: 36,
      lng: 138,
      gdp: 4.2,
      growth: 1.2,
      inflation: 2.5,
      pop: 125,
    },
    {
      name: "United Kingdom",
      lat: 55,
      lng: -3,
      gdp: 3.1,
      growth: 0.5,
      inflation: 4.2,
      pop: 68,
    },
    {
      name: "France",
      lat: 46,
      lng: 2,
      gdp: 2.9,
      growth: 0.9,
      inflation: 4.9,
      pop: 68,
    },
    {
      name: "Russia",
      lat: 60,
      lng: 100,
      gdp: 2.2,
      growth: -2.1,
      inflation: 5.9,
      pop: 144,
    },
    {
      name: "Canada",
      lat: 56,
      lng: -106,
      gdp: 2.1,
      growth: 1.5,
      inflation: 3.9,
      pop: 39,
    },
    {
      name: "South Korea",
      lat: 37,
      lng: 127,
      gdp: 1.7,
      growth: 1.4,
      inflation: 3.6,
      pop: 52,
    },
    {
      name: "Australia",
      lat: -27,
      lng: 133,
      gdp: 1.7,
      growth: 2.2,
      inflation: 5.1,
      pop: 26,
    },
    {
      name: "Mexico",
      lat: 23,
      lng: -102,
      gdp: 1.4,
      growth: 3.2,
      inflation: 4.7,
      pop: 128,
    },
    {
      name: "Indonesia",
      lat: -2,
      lng: 118,
      gdp: 1.3,
      growth: 5.3,
      inflation: 3.7,
      pop: 277,
    },
    {
      name: "Saudi Arabia",
      lat: 24,
      lng: 45,
      gdp: 1.1,
      growth: 3.1,
      inflation: 2.3,
      pop: 36,
    },
    {
      name: "Turkey",
      lat: 39,
      lng: 35,
      gdp: 0.9,
      growth: 4.5,
      inflation: 64.8,
      pop: 85,
    },
    {
      name: "Argentina",
      lat: -34,
      lng: -64,
      gdp: 0.6,
      growth: -1.6,
      inflation: 133.5,
      pop: 46,
    },
    {
      name: "Nigeria",
      lat: 9,
      lng: 8,
      gdp: 0.5,
      growth: 3.3,
      inflation: 24.5,
      pop: 223,
    },
    {
      name: "South Africa",
      lat: -29,
      lng: 24,
      gdp: 0.4,
      growth: 0.9,
      inflation: 6.1,
      pop: 60,
    },
    {
      name: "Egypt",
      lat: 26,
      lng: 30,
      gdp: 0.4,
      growth: 3.8,
      inflation: 33.7,
      pop: 111,
    },
  ];

  const metrics = {
    gdp: { name: "GDP Size", unit: "T", color: "#3b82f6" },
    growth: { name: "Growth Rate", unit: "%", color: "#10b981" },
    inflation: { name: "Inflation", unit: "%", color: "#ef4444" },
    pop: { name: "Population", unit: "M", color: "#8b5cf6" },
  };

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 800;

    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw globe background
      const gradient = ctx.createRadialGradient(400, 400, 0, 400, 400, 350);
      gradient.addColorStop(0, "#1e40af");
      gradient.addColorStop(0.5, "#1e3a8a");
      gradient.addColorStop(1, "#1e293b");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(400, 400, 350, 0, Math.PI * 2);
      ctx.fill();

      // Draw grid lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.2)";
      ctx.lineWidth = 1;

      // Latitude lines
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        for (let lng = -180; lng <= 180; lng += 5) {
          const point = projectPoint(lat, lng + rotation, 400, 400, 350);
          if (point.visible) {
            if (lng === -180) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
          }
        }
        ctx.stroke();
      }

      // Longitude lines
      for (let lng = -180; lng <= 180; lng += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const point = projectPoint(lat, lng + rotation, 400, 400, 350);
          if (point.visible) {
            if (lat === -90) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
          }
        }
        ctx.stroke();
      }

      // Draw country markers
      countries.forEach((country) => {
        const point = projectPoint(
          country.lat,
          country.lng + rotation,
          400,
          400,
          350,
        );

        if (point.visible) {
          const value = country[selectedMetric];
          const maxValue = Math.max(...countries.map((c) => c[selectedMetric]));
          const size = 8 + (value / maxValue) * 20;

          // Glow effect
          const glowGradient = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            size,
          );
          glowGradient.addColorStop(0, metrics[selectedMetric].color);
          glowGradient.addColorStop(1, "transparent");

          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fill();

          // Marker dot
          ctx.fillStyle = metrics[selectedMetric].color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, size / 3, 0, Math.PI * 2);
          ctx.fill();

          // Pulse animation for hovered country
          if (hoveredCountry === country.name) {
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(point.x, point.y, size + 5, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });
    };

    const animate = () => {
      if (!isDragging) {
        setRotation((r) => (r + 0.2) % 360);
      }
      drawGlobe();
      requestAnimationFrame(animate);
    };

    animate();
  }, [rotation, selectedMetric, hoveredCountry, isDragging]);

  const projectPoint = (lat, lng, cx, cy, radius) => {
    const lambda = (lng * Math.PI) / 180;
    const phi = (lat * Math.PI) / 180;

    const x = cx + radius * Math.cos(phi) * Math.sin(lambda);
    const y = cy - radius * Math.sin(phi);
    const z = radius * Math.cos(phi) * Math.cos(lambda);

    return {
      x,
      y,
      visible: z > 0,
    };
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setMouseStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - mouseStart.x;
      setRotation((r) => (r + dx * 0.5) % 360);
      setMouseStart({ x: e.clientX, y: e.clientY });
    }

    // Check hover
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = null;
    countries.forEach((country) => {
      const point = projectPoint(
        country.lat,
        country.lng + rotation,
        400,
        400,
        350,
      );
      const dist = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
      if (dist < 20 && point.visible) {
        found = country.name;
      }
    });
    setHoveredCountry(found);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedCountryData = countries.find((c) => c.name === hoveredCountry);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Globe size={32} color="#3b82f6" />
        <div>
          <h2 style={styles.title}>Interactive Economic Globe</h2>
          <p style={styles.subtitle}>
            Drag to rotate • Hover to explore • 20 major economies
          </p>
        </div>
      </div>

      <div style={styles.content}>
        {/* Controls */}
        <div style={styles.sidebar}>
          <div style={styles.searchBox}>
            <Search size={18} color="#64748b" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.metricSelector}>
            <h3 style={styles.sectionTitle}>Select Metric</h3>
            {Object.entries(metrics).map(([key, metric]) => (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                style={{
                  ...styles.metricButton,
                  ...(selectedMetric === key
                    ? {
                        background: metric.color,
                        color: "#fff",
                      }
                    : {}),
                }}
              >
                <span>{metric.name}</span>
                {selectedMetric === key && <Zap size={16} />}
              </button>
            ))}
          </div>

          <div style={styles.countryList}>
            <h3 style={styles.sectionTitle}>Countries</h3>
            <div style={styles.scrollList}>
              {filteredCountries.map((country) => (
                <div
                  key={country.name}
                  onMouseEnter={() => setHoveredCountry(country.name)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  style={{
                    ...styles.countryItem,
                    ...(hoveredCountry === country.name
                      ? styles.countryItemActive
                      : {}),
                  }}
                >
                  <div style={styles.countryName}>{country.name}</div>
                  <div
                    style={{
                      ...styles.countryValue,
                      color: metrics[selectedMetric].color,
                    }}
                  >
                    {country[selectedMetric]}
                    {metrics[selectedMetric].unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Globe Canvas */}
        <div style={styles.globeContainer}>
          <canvas
            ref={canvasRef}
            style={styles.canvas}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />

          {/* Tooltip */}
          {selectedCountryData && (
            <div style={styles.tooltip}>
              <div style={styles.tooltipHeader}>
                <h3 style={styles.tooltipTitle}>{selectedCountryData.name}</h3>
                <div
                  style={{
                    ...styles.tooltipTrend,
                    color:
                      selectedCountryData.growth > 0 ? "#10b981" : "#ef4444",
                  }}
                >
                  {selectedCountryData.growth > 0 ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  {selectedCountryData.growth}%
                </div>
              </div>
              <div style={styles.tooltipGrid}>
                <div style={styles.tooltipStat}>
                  <span style={styles.tooltipLabel}>GDP</span>
                  <span style={styles.tooltipValue}>
                    ${selectedCountryData.gdp}T
                  </span>
                </div>
                <div style={styles.tooltipStat}>
                  <span style={styles.tooltipLabel}>Inflation</span>
                  <span style={styles.tooltipValue}>
                    {selectedCountryData.inflation}%
                  </span>
                </div>
                <div style={styles.tooltipStat}>
                  <span style={styles.tooltipLabel}>Population</span>
                  <span style={styles.tooltipValue}>
                    {selectedCountryData.pop}M
                  </span>
                </div>
                <div style={styles.tooltipStat}>
                  <span style={styles.tooltipLabel}>Growth</span>
                  <span style={styles.tooltipValue}>
                    {selectedCountryData.growth}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div style={styles.instructions}>
            <div style={styles.instructionItem}>🖱️ Drag to rotate</div>
            <div style={styles.instructionItem}>👆 Hover for details</div>
            <div style={styles.instructionItem}>⚡ Live data visualization</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        <div style={styles.legendTitle}>
          Marker Size = {metrics[selectedMetric].name}
        </div>
        <div style={styles.legendScale}>
          <div style={styles.legendItem}>
            <div
              style={{
                ...styles.legendDot,
                width: "8px",
                height: "8px",
                background: metrics[selectedMetric].color,
              }}
            ></div>
            <span>Small</span>
          </div>
          <div style={styles.legendItem}>
            <div
              style={{
                ...styles.legendDot,
                width: "16px",
                height: "16px",
                background: metrics[selectedMetric].color,
              }}
            ></div>
            <span>Medium</span>
          </div>
          <div style={styles.legendItem}>
            <div
              style={{
                ...styles.legendDot,
                width: "24px",
                height: "24px",
                background: metrics[selectedMetric].color,
              }}
            ></div>
            <span>Large</span>
          </div>
        </div>
      </div>
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
    maxWidth: "1400px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
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
  content: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "30px",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    background: "#f8fafc",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
  },
  searchInput: {
    flex: 1,
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "0.95rem",
  },
  metricSelector: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sectionTitle: {
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
  },
  metricButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "all 0.3s",
  },
  countryList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  scrollList: {
    maxHeight: "400px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  countryItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    background: "#f8fafc",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  countryItemActive: {
    background: "#3b82f6",
    color: "#fff",
    transform: "translateX(5px)",
  },
  countryName: {
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  countryValue: {
    fontSize: "0.9rem",
    fontWeight: "700",
  },
  globeContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    width: "100%",
    maxWidth: "800px",
    cursor: "grab",
    borderRadius: "12px",
  },
  tooltip: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    minWidth: "250px",
  },
  tooltipHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "1px solid #e2e8f0",
  },
  tooltipTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  tooltipTrend: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "1rem",
    fontWeight: "700",
  },
  tooltipGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  tooltipStat: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  tooltipLabel: {
    fontSize: "0.75rem",
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  tooltipValue: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1e293b",
  },
  instructions: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  instructionItem: {
    padding: "8px 12px",
    background: "rgba(15, 23, 42, 0.8)",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "0.85rem",
    fontWeight: "500",
    backdropFilter: "blur(10px)",
  },
  legend: {
    marginTop: "30px",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  legendTitle: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#1e293b",
  },
  legendScale: {
    display: "flex",
    gap: "30px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.85rem",
    color: "#64748b",
  },
  legendDot: {
    borderRadius: "50%",
  },
};

export default Interactive3DGlobe;
