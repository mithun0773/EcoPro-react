import React, { useEffect, useState } from "react";
import "../App.css";
import heroImage from "./assets/images/ecopro.png";

const HeroSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) setVisible(true);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`hero-container ${visible ? "show" : ""}`}>
      <img src={heroImage} alt="Economic Prosperity" className="hero-image" />
      <div className="hero-text">
        <h1>ECONOMIC PROSPERITY</h1>
        <p>Innovation & Growth for a Brighter Future</p>
      </div>
    </div>
  );
};

export default HeroSection;
