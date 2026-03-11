import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Cog,
  UserRound,
  HeartPulse,
  Users,
  House,
  Moon,
  Sun,
  ChartNoAxesCombined,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "../App";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <House size={17} /> },
    {
      to: "/inflation",
      label: "Inflation",
      icon: <ChartNoAxesCombined size={17} />,
    },
    { to: "/population", label: "Population", icon: <Users size={17} /> },
    { to: "/health", label: "Health", icon: <HeartPulse size={17} /> },
    { to: "/about", label: "About", icon: <Cog size={17} /> },
    { to: "/profile", label: "Profile", icon: <UserRound size={17} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.logoSection}>
          <TrendingUp size={24} color="#3b82f6" />
          <span style={styles.logo}>
            Eco<span style={styles.logoPro}>Pro</span>
          </span>
        </div>

        <div style={styles.navLinks}>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              style={{
                ...styles.navLink,
                ...(isActive(link.to) ? styles.navLinkActive : {}),
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {link.icon}
              {link.label}
              {isActive(link.to) && <div style={styles.activeIndicator} />}
            </Link>
          ))}
        </div>

        <div style={styles.rightSection}>
          <button
            onClick={toggleTheme}
            style={styles.themeButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            style={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              style={{
                ...styles.mobileNavLink,
                ...(isActive(link.to) ? styles.mobileNavLinkActive : {}),
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

const styles = {
  nav: {
    padding: "12px 40px",
    background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: "1000",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    boxSizing: "border-box",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#fff",
    letterSpacing: "-0.5px",
  },
  logoPro: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  navLinks: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  navLink: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  navLinkActive: {
    background: "rgba(59, 130, 246, 0.2)",
    color: "#93c5fd",
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    bottom: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "40%",
    height: "3px",
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    borderRadius: "2px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  themeButton: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  mobileMenuButton: {
    display: "none",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    padding: "8px",
  },
  mobileMenu: {
    position: "fixed",
    top: "60px",
    left: 0,
    right: 0,
    background: "linear-gradient(180deg, #1e293b 0%, #334155 100%)",
    padding: "20px",
    zIndex: "999",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  mobileNavLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 18px",
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    background: "rgba(255, 255, 255, 0.05)",
  },
  mobileNavLinkActive: {
    background: "rgba(59, 130, 246, 0.2)",
    color: "#93c5fd",
    fontWeight: "600",
  },
};

export default Navbar;
