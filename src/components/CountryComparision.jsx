// src/components/CountryComparison.jsx - SUPER ENHANCED
import React, { useState, useEffect } from "react";
import { Zap, TrendingUp, TrendingDown, Search, X, Plus } from "lucide-react";
import Papa from "papaparse";

const CountryComparison = () => {
  const [selectedCountries, setSelectedCountries] = useState([
    "India",
    "China",
    "United States",
  ]);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [countryData, setCountryData] = useState({});
  const [loading, setLoading] = useState(true);

  // Load real country data from CSV
  useEffect(() => {
    const loadCountryData = async () => {
      try {
        const gdpData = await parseCSV("/data/gdp.csv");
        const inflationData = await parseCSV("/data/inflation.csv");
        const populationData = await parseCSV("/data/population.csv");

        const countries = gdpData
          .map((row) => row["Country Name"])
          .filter(Boolean);
        setAvailableCountries([...new Set(countries)].sort());

        // Build combined data structure
        const combined = {};
        countries.forEach((country) => {
          const gdpRow = gdpData.find((r) => r["Country Name"] === country);
          const inflationRow = inflationData.find(
            (r) => r["Country Name"] === country,
          );
          const popRow = populationData.find(
            (r) => r["Country Name"] === country,
          );

          if (gdpRow && inflationRow && popRow) {
            const gdpValues = Object.keys(gdpRow)
              .filter((k) => Number(k) >= 2000 && Number(k) <= 2023)
              .map((k) => parseFloat(gdpRow[k]?.replace(/,/g, "")) || 0);

            const inflationValues = Object.keys(inflationRow)
              .filter((k) => Number(k) >= 2000 && Number(k) <= 2023)
              .map((k) => parseFloat(inflationRow[k]) || 0);

            const latestGDP = gdpValues[gdpValues.length - 1];
            const previousGDP = gdpValues[gdpValues.length - 2];
            const growthRate = (
              ((latestGDP - previousGDP) / previousGDP) *
              100
            ).toFixed(2);

            combined[country] = {
              gdp: formatNumber(latestGDP),
              growth: growthRate,
              inflation:
                inflationValues[inflationValues.length - 1]?.toFixed(2) ||
                "N/A",
              population: popRow["2023"] || popRow["2022"] || "N/A",
              gdpTrend: gdpValues.slice(-5),
            };
          }
        });

        setCountryData(combined);
        setLoading(false);
      } catch (error) {
        console.error("Error loading country data:", error);
        setLoading(false);
      }
    };

    loadCountryData();
  }, []);

  const parseCSV = (path) => {
    return new Promise((resolve) => {
      Papa.parse(path, {
        download: true,
        header: true,
        skipEmptyLines: true,
        beforeFirstChunk: (chunk) => {
          const lines = chunk.split("\n");
          const headerLineIndex = lines.findIndex((line) =>
            line.includes("Country Name"),
          );
          return lines.slice(headerLineIndex).join("\n");
        },
        complete: (result) => resolve(result.data),
      });
    });
  };

  const formatNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const addCountry = (country) => {
    if (selectedCountries.length < 5 && !selectedCountries.includes(country)) {
      setSelectedCountries([...selectedCountries, country]);
    }
    setShowSearch(false);
    setSearchTerm("");
  };

  const removeCountry = (country) => {
    if (selectedCountries.length > 2) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    }
  };

  const filteredCountries = availableCountries.filter(
    (country) =>
      country.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedCountries.includes(country),
  );

  const getComparisonColor = (value, allValues, reverse = false) => {
    const max = Math.max(...allValues.filter((v) => !isNaN(v)));
    const min = Math.min(...allValues.filter((v) => !isNaN(v)));
    const normalized = (value - min) / (max - min);

    if (reverse) {
      return normalized > 0.6
        ? "#ef4444"
        : normalized > 0.3
          ? "#f59e0b"
          : "#10b981";
    }
    return normalized > 0.6
      ? "#10b981"
      : normalized > 0.3
        ? "#f59e0b"
        : "#ef4444";
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading 195 countries data...</p>
      </div>
    );
  }

  const allGrowthRates = selectedCountries.map((c) =>
    parseFloat(countryData[c]?.growth || 0),
  );
  const allInflationRates = selectedCountries.map((c) =>
    parseFloat(countryData[c]?.inflation || 0),
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Zap size={28} color="#f59e0b" />
        <div>
          <h2 style={styles.title}>Multi-Country Economic Comparison</h2>
          <p style={styles.subtitle}>
            Compare up to 5 countries side-by-side • 195 countries available
          </p>
        </div>
      </div>

      {/* Country Selection Bar */}
      <div style={styles.selectionBar}>
        {selectedCountries.map((country) => (
          <div key={country} style={styles.selectedCountry}>
            <span>{country}</span>
            {selectedCountries.length > 2 && (
              <button
                onClick={() => removeCountry(country)}
                style={styles.removeButton}
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}

        {selectedCountries.length < 5 && (
          <button
            onClick={() => setShowSearch(!showSearch)}
            style={styles.addButton}
          >
            <Plus size={18} />
            Add Country
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {showSearch && (
        <div style={styles.searchContainer}>
          <div style={styles.searchBox}>
            <Search size={20} color="#64748b" />
            <input
              type="text"
              placeholder="Search from 195 countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              autoFocus
            />
          </div>
          <div style={styles.searchResults}>
            {filteredCountries.slice(0, 10).map((country) => (
              <div
                key={country}
                onClick={() => addCountry(country)}
                style={styles.searchResultItem}
              >
                {country}
              </div>
            ))}
            {filteredCountries.length === 0 && (
              <div style={styles.noResults}>No countries found</div>
            )}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      <div style={styles.comparisonTable}>
        <div style={styles.tableHeader}>
          <div style={styles.metricNameHeader}>Metric</div>
          {selectedCountries.map((country) => (
            <div key={country} style={styles.countryHeader}>
              {country}
            </div>
          ))}
        </div>

        {/* GDP Row */}
        <div style={styles.tableRow}>
          <div style={styles.metricName}>
            <div style={styles.metricLabel}>GDP (2023)</div>
            <div style={styles.metricDescription}>Total Economic Output</div>
          </div>
          {selectedCountries.map((country) => (
            <div key={country} style={styles.dataCell}>
              <div style={styles.dataValue}>
                {countryData[country]?.gdp || "N/A"}
              </div>
            </div>
          ))}
        </div>

        {/* Growth Rate Row */}
        <div style={styles.tableRow}>
          <div style={styles.metricName}>
            <div style={styles.metricLabel}>Growth Rate</div>
            <div style={styles.metricDescription}>Year-over-Year Change</div>
          </div>
          {selectedCountries.map((country, i) => {
            const growth = parseFloat(countryData[country]?.growth || 0);
            const color = getComparisonColor(growth, allGrowthRates);
            return (
              <div key={country} style={styles.dataCell}>
                <div style={{ ...styles.dataValue, color }}>
                  {growth > 0 ? (
                    <TrendingUp size={18} />
                  ) : (
                    <TrendingDown size={18} />
                  )}
                  {growth > 0 ? "+" : ""}
                  {growth}%
                </div>
                <div style={styles.rankBadge}>
                  #{allGrowthRates.filter((g) => g > growth).length + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Inflation Row */}
        <div style={styles.tableRow}>
          <div style={styles.metricName}>
            <div style={styles.metricLabel}>Inflation Rate</div>
            <div style={styles.metricDescription}>Consumer Price Index</div>
          </div>
          {selectedCountries.map((country, i) => {
            const inflation = parseFloat(countryData[country]?.inflation || 0);
            const color = getComparisonColor(
              inflation,
              allInflationRates,
              true,
            );
            return (
              <div key={country} style={styles.dataCell}>
                <div style={{ ...styles.dataValue, color }}>{inflation}%</div>
                <div style={styles.statusBadge}>
                  {inflation < 3 ? "Low" : inflation < 6 ? "Moderate" : "High"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Population Row */}
        <div style={styles.tableRow}>
          <div style={styles.metricName}>
            <div style={styles.metricLabel}>Population</div>
            <div style={styles.metricDescription}>Total Inhabitants</div>
          </div>
          {selectedCountries.map((country) => (
            <div key={country} style={styles.dataCell}>
              <div style={styles.dataValue}>
                {parseFloat(
                  countryData[country]?.population || 0,
                ).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Sparklines */}
      <div style={styles.sparklineContainer}>
        <h3 style={styles.sparklineTitle}>5-Year GDP Trend</h3>
        <div style={styles.sparklineGrid}>
          {selectedCountries.map((country) => {
            const trend = countryData[country]?.gdpTrend || [];
            const max = Math.max(...trend);
            const min = Math.min(...trend);

            return (
              <div key={country} style={styles.sparklineCard}>
                <div style={styles.sparklineCountry}>{country}</div>
                <svg width="100%" height="60" viewBox="0 0 100 60">
                  <polyline
                    points={trend
                      .map((val, i) => {
                        const x = (i / (trend.length - 1)) * 100;
                        const y = 50 - ((val - min) / (max - min)) * 40;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  {trend.map((val, i) => {
                    const x = (i / (trend.length - 1)) * 100;
                    const y = 50 - ((val - min) / (max - min)) * 40;
                    return (
                      <circle key={i} cx={x} cy={y} r="2" fill="#3b82f6" />
                    );
                  })}
                </svg>
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          💡 Pro Tip: Add up to 5 countries to compare. Click on metrics to see
          detailed breakdowns.
        </p>
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
    margin: "40px auto",
    maxWidth: "1400px",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    gap: "20px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f4f6",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
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
  selectionBar: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "20px",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "12px",
  },
  selectedCountry: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    background: "#fff",
    border: "2px solid #3b82f6",
    borderRadius: "8px",
    fontWeight: "600",
    color: "#1e293b",
  },
  removeButton: {
    background: "transparent",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "2px",
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    background: "transparent",
    border: "2px dashed #cbd5e1",
    borderRadius: "8px",
    color: "#64748b",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  searchContainer: {
    position: "relative",
    marginBottom: "20px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    background: "#fff",
    border: "2px solid #3b82f6",
    borderRadius: "10px",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "1rem",
  },
  searchResults: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: "8px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    maxHeight: "300px",
    overflowY: "auto",
    zIndex: 100,
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  },
  searchResultItem: {
    padding: "12px 16px",
    cursor: "pointer",
    transition: "all 0.2s",
    borderBottom: "1px solid #f1f5f9",
  },
  noResults: {
    padding: "20px",
    textAlign: "center",
    color: "#94a3b8",
  },
  comparisonTable: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    marginBottom: "30px",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "250px repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    padding: "15px",
    background: "#f8fafc",
    borderRadius: "8px",
    fontWeight: "700",
  },
  metricNameHeader: {
    color: "#1e293b",
    fontSize: "0.95rem",
  },
  countryHeader: {
    color: "#1e293b",
    fontSize: "0.95rem",
    textAlign: "center",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "250px repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    padding: "20px 15px",
    background: "#fff",
    borderBottom: "1px solid #f1f5f9",
  },
  metricName: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  metricLabel: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e293b",
  },
  metricDescription: {
    fontSize: "0.8rem",
    color: "#94a3b8",
  },
  dataCell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  dataValue: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1e293b",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  rankBadge: {
    padding: "4px 10px",
    background: "#f1f5f9",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#64748b",
  },
  statusBadge: {
    padding: "4px 10px",
    background: "#f1f5f9",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#64748b",
  },
  sparklineContainer: {
    marginTop: "30px",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "12px",
  },
  sparklineTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "15px",
  },
  sparklineGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },
  sparklineCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
  },
  sparklineCountry: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "10px",
  },
  footer: {
    marginTop: "20px",
    padding: "15px",
    background: "#fef3c7",
    borderRadius: "8px",
    borderLeft: "4px solid #f59e0b",
  },
  footerText: {
    fontSize: "0.9rem",
    color: "#92400e",
    margin: 0,
  },
};

export default CountryComparison;
