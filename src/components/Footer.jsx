import React from "react";
import {
  TrendingUp,
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer style={styles.footer}>
        {/* Wave Background */}
        <div style={styles.waveContainer}>
          <svg
            viewBox="0 0 1440 120"
            style={styles.wave}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#gradient)"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#ec4899", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main Footer Content */}
        <div style={styles.container}>
          {/* Top Section */}
          <div style={styles.topSection}>
            {/* Brand Column */}
            <div style={styles.brandColumn}>
              <div style={styles.logoContainer}>
                <TrendingUp size={32} color="#3b82f6" />
                <h2 style={styles.brandName}>
                  Eco<span style={styles.brandAccent}>Pro</span>
                </h2>
              </div>
              <p style={styles.tagline}>
                AI-Powered Economic Intelligence Platform
              </p>
              <p style={styles.description}>
                Transforming economic data into actionable insights through
                advanced AI analytics and predictive forecasting.
              </p>

              {/* Social Links */}
              <div style={styles.socialContainer}>
                <a
                  href="https://github.com"
                  style={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  style={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  style={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div style={styles.linkColumn}>
              <h3 style={styles.columnTitle}>Explore</h3>
              <ul style={styles.linkList}>
                <li>
                  <a href="/gdp" style={styles.link}>
                    GDP Analytics
                  </a>
                </li>
                <li>
                  <a href="/inflation" style={styles.link}>
                    Inflation Tracker
                  </a>
                </li>
                <li>
                  <a href="/population" style={styles.link}>
                    Population Insights
                  </a>
                </li>
                <li>
                  <a href="/health" style={styles.link}>
                    Health Metrics
                  </a>
                </li>
                <li>
                  <a href="/employement" style={styles.link}>
                    Employment Data
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div style={styles.linkColumn}>
              <h3 style={styles.columnTitle}>Resources</h3>
              <ul style={styles.linkList}>
                <li>
                  <a href="#" style={styles.link}>
                    AI Forecasting
                  </a>
                </li>
                <li>
                  <a href="#" style={styles.link}>
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" style={styles.link}>
                    API Access
                  </a>
                </li>
                <li>
                  <a href="#" style={styles.link}>
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" style={styles.link}>
                    Research Papers
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div style={styles.linkColumn}>
              <h3 style={styles.columnTitle}>Get in Touch</h3>
              <ul style={styles.contactList}>
                <li style={styles.contactItem}>
                  <Mail size={16} style={styles.contactIcon} />
                  <a href="mailto:info@ecopro.ai" style={styles.link}>
                    info@ecopro.ai
                  </a>
                </li>
                <li style={styles.contactItem}>
                  <Phone size={16} style={styles.contactIcon} />
                  <span style={styles.contactText}>+1 (555) 123-4567</span>
                </li>
                <li style={styles.contactItem}>
                  <MapPin size={16} style={styles.contactIcon} />
                  <span style={styles.contactText}>Silicon Valley, CA</span>
                </li>
              </ul>

              {/* Newsletter */}
              <div style={styles.newsletter}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={styles.newsletterInput}
                />
                <button style={styles.newsletterButton}>Subscribe</button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={styles.divider}></div>

          {/* Bottom Section */}
          <div style={styles.bottomSection}>
            <p style={styles.copyright}>
              © 2025 EcoPro | Economic Prosperity Initiative. All rights
              reserved.
            </p>
            <div style={styles.legalLinks}>
              <a href="#" style={styles.legalLink}>
                Privacy Policy
              </a>
              <span style={styles.dot}>•</span>
              <a href="#" style={styles.legalLink}>
                Terms of Service
              </a>
              <span style={styles.dot}>•</span>
              <a href="#" style={styles.legalLink}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Floating Badge */}
        <div style={styles.badge}>
          <span style={styles.badgeDot}></span>
          AI-Powered
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
};

const styles = {
  footer: {
    position: "relative",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    color: "#e2e8f0",
    paddingTop: "80px",
    paddingBottom: "20px",
    overflow: "hidden",
  },
  waveContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    overflow: "hidden",
    lineHeight: 0,
  },
  wave: {
    position: "relative",
    display: "block",
    width: "calc(100% + 1.3px)",
    height: "120px",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 40px",
    position: "relative",
    zIndex: 1,
  },
  topSection: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
    gap: "60px",
    marginBottom: "60px",
  },
  brandColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  brandName: {
    fontSize: "2rem",
    fontWeight: "800",
    margin: 0,
    color: "#fff",
  },
  brandAccent: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  tagline: {
    fontSize: "1rem",
    color: "#94a3b8",
    fontWeight: "600",
    margin: 0,
  },
  description: {
    fontSize: "0.95rem",
    color: "#cbd5e1",
    lineHeight: "1.6",
    margin: 0,
  },
  socialContainer: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  },
  socialLink: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    textDecoration: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  linkColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  columnTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    marginBottom: "5px",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "0.95rem",
    transition: "all 0.2s ease",
    cursor: "pointer",
    display: "inline-block",
  },
  contactList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  contactIcon: {
    color: "#3b82f6",
    flexShrink: 0,
  },
  contactText: {
    color: "#cbd5e1",
    fontSize: "0.95rem",
  },
  newsletter: {
    marginTop: "10px",
    display: "flex",
    gap: "8px",
  },
  newsletterInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    fontSize: "0.9rem",
    outline: "none",
  },
  newsletterButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  divider: {
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
    marginBottom: "30px",
  },
  bottomSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  copyright: {
    fontSize: "0.9rem",
    color: "#94a3b8",
    margin: 0,
  },
  legalLinks: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  legalLink: {
    fontSize: "0.9rem",
    color: "#94a3b8",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
  dot: {
    color: "#475569",
  },
  badge: {
    position: "absolute",
    top: "100px",
    right: "40px",
    padding: "8px 16px",
    borderRadius: "20px",
    background: "rgba(59, 130, 246, 0.1)",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    color: "#3b82f6",
    fontSize: "0.85rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    animation: "float 3s ease-in-out infinite",
  },
  badgeDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#3b82f6",
    animation: "pulse 2s ease-in-out infinite",
  },
};

export default Footer;
