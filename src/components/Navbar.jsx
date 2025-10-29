import React from "react";
import { Link } from "react-router-dom";
import { Cog,UserRound,HeartPulse,Users, House,Moon,Sun,ChartNoAxesCombined } from "lucide-react";
import { useTheme } from "../App";

const Navbar = () => {
  const {theme,toggleTheme} = useTheme();
  return (
    <nav
      style={{
        padding: "15px 40px",
        backgroundColor: "#222",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: "1000",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      {[
        { to: "/", label: "Home", icon: <House size={17} /> },
        { to: "/inflation", label: "Inflation", icon: <ChartNoAxesCombined /> },
        { to: "/population", label: "Population", icon: <Users /> },
        { to: "/about", label: "About", icon: <Cog /> },
        { to: "/health", label: "Health", icon: <HeartPulse /> },
        { to: "/profile", label: "Profile", icon: <UserRound size={17} /> },
      ].map((link, index) => (
        <Link
          key={index}
          to={link.to}
          style={{
            margin: "10px 25px",
            color: "#fff",
            textDecoration: "none",
            fontSize: "18px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px", // keeps space between icon and text
            transition: "color 0.3s",
          }}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}

      <button
        onClick={toggleTheme}
        style={{
          marginLeft: "20px",
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
