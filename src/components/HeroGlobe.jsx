// src/components/HeroGlobe.jsx
import React, { useEffect, useRef } from "react";
import { TrendingUp, Zap, Globe, BarChart3 } from "lucide-react";

const HeroGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Particle system for animated background
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    function animate() {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.6)";
        ctx.fill();

        // Draw connections
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div style={styles.hero}>
      <canvas ref={canvasRef} style={styles.canvas} />

      <div style={styles.content}>
        <div style={styles.badge}>
          <Zap size={16} />
          <span>AI-Powered Forecasting Engine</span>
        </div>

        <h1 style={styles.title}>
          The Future of Economic
          <br />
          <span style={styles.gradient}>Intelligence</span> is Here
        </h1>

        <p style={styles.subtitle}>
          Transform 60+ years of global economic data into actionable insights
          with advanced AI predictions and real-time analytics
        </p>

        <div style={styles.stats}>
          <div style={styles.statBox}>
            <TrendingUp size={24} color="#3b82f6" />
            <div>
              <div style={styles.statNumber}>98.7%</div>
              <div style={styles.statLabel}>Forecast Accuracy</div>
            </div>
          </div>
          <div style={styles.statBox}>
            <Globe size={24} color="#10b981" />
            <div>
              <div style={styles.statNumber}>195+</div>
              <div style={styles.statLabel}>Countries Covered</div>
            </div>
          </div>
          <div style={styles.statBox}>
            <BarChart3 size={24} color="#f59e0b" />
            <div>
              <div style={styles.statNumber}>60+</div>
              <div style={styles.statLabel}>Years of Data</div>
            </div>
          </div>
        </div>

        <div style={styles.cta}>
          <button style={styles.primaryButton}>Explore Live Dashboard →</button>
          <button style={styles.secondaryButton}>Watch Demo</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  hero: {
    position: "relative",
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  content: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    maxWidth: "900px",
    padding: "0 20px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    background: "rgba(59, 130, 246, 0.1)",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    borderRadius: "20px",
    color: "#3b82f6",
    fontSize: "0.9rem",
    fontWeight: "600",
    marginBottom: "30px",
  },
  title: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "20px",
    lineHeight: "1.2",
  },
  gradient: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#cbd5e1",
    marginBottom: "40px",
    lineHeight: "1.6",
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  statBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
  },
  statNumber: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#fff",
  },
  statLabel: {
    fontSize: "0.85rem",
    color: "#94a3b8",
  },
  cta: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  secondaryButton: {
    padding: "16px 32px",
    background: "transparent",
    color: "#fff",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
  },
};

export default HeroGlobe;
