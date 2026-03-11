import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../CardSection.css";

const CardSection = () => {
  const imageRefs = useRef([]);

  const sections = [
    {
      title: "🌍 Key Economic Indicators",
      subtitle: "Global fiscal trends and growth projections.",
      cards: [
        {
          img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&q=75",
          tag: "Economy",
          title: "GDP Growth Insights",
          desc: "Explore year-over-year GDP changes and their economic implications.",
          color: "blue",
          link: "/gdp",
        },
        {
          img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&q=75",
          tag: "Demographics",
          title: "Population Dynamics",
          desc: "Track global population growth, migration trends, and density shifts.",
          color: "green",
          link: "/population",
        },
        {
          img: "https://plus.unsplash.com/premium_photo-1661782589470-6d2e76a36b9d?w=400&q=75",
          tag: "Environment",
          title: "Sustainability Metrics",
          desc: "Learn how economic growth connects with environmental impact.",
          color: "red",
        },
        {
          img: "https://media.istockphoto.com/id/157311703/photo/inflation.webp?a=1&b=1&s=612x612&w=0&k=20&c=qwXxWdGMFqdwcnOhXoesASptif0t-WJrfsHxinTRGf4=",
          tag: "Finance",
          title: "Inflation & Currency",
          desc: "Visualize inflation trends, exchange rates, and purchasing power.",
          color: "yellow",
          link: "/inflation",
        },
      ],
    },
    {
      title: "👥 Demographic Insights",
      subtitle: "Human capital and societal shifts.",
      cards: [
        {
          img: "https://images.unsplash.com/photo-1560179376-2570140bed14?w=400&q=75",
          tag: "Population",
          title: "Population Overview",
          desc: "Analyze the growing global population across continents.",
          color: "teal",
        },
        {
          img: "https://plus.unsplash.com/premium_photo-1680229008398-3a6a89bf71ed?w=400&q=75",
          tag: "Birth",
          title: "Birth Rate Trends",
          desc: "View birth rate changes and their social implications.",
          color: "orange",
          link: "/birth",
        },
        {
          img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=75",
          tag: "Death",
          title: "Mortality & Health",
          desc: "Understand death rate data linked with health systems.",
          color: "gray",
          link: "/health",
        },
        {
          img: "https://images.unsplash.com/photo-1541956799312-3f9df99e0006?w=400&q=75",
          tag: "Fertility",
          title: "Fertility Patterns",
          desc: "Study fertility rate fluctuations and their impact on society.",
          color: "pink",
          link: "/fertility",
        },
      ],
    },
    {
      title: "🏭 Sectoral Overview",
      subtitle: "In-depth analysis of global industries.",
      cards: [
        {
          img: "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?w=400&q=75",
          tag: "Agri",
          title: "Agriculture Sector",
          desc: "Greenhouse farming, sustainable crops, and farming tech.",
          color: "pink",
          link: "/agri",
        },
        {
          img: "https://plus.unsplash.com/premium_photo-1681426730828-bfee2d13861d?w=400&q=75",
          tag: "Industry",
          title: "Industrial & Warehouse",
          desc: "Warehouse management and industrial growth patterns.",
          color: "red",
        },
        {
          img: "https://plus.unsplash.com/premium_photo-1678743133487-d501f3b0696b?w=400&q=75",
          tag: "Energy",
          title: "Energy & Renewables",
          desc: "Solar, Nuclear, and renewable resource distribution.",
          color: "green",
        },
        {
          img: "https://images.unsplash.com/photo-1656291716879-295102bc71e3?w=400&q=75",
          tag: "Labor",
          title: "Employment Sector",
          desc: "Employee standards and growth across various countries.",
          color: "blue",
          link: "/employement",
        },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;

            if (src && !img.src.includes(src)) {
              img.src = src;
              img.classList.add("loaded");
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.01,
      },
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, []);

  let imageIndex = 0;

  return (
    <main className="insight-dashboard">
      <header className="dashboard-intro">
        <h1>Global Intelligence Portal</h1>
        <p>
          Real-time data visualization across major economic and social sectors.
        </p>
      </header>

      {sections.map((section, idx) => (
        <section className="insight-section" key={idx}>
          <div className="section-heading">
            <h2>{section.title}</h2>
            <p>{section.subtitle}</p>
          </div>

          <div className="insight-grid">
            {section.cards.map((card, i) => (
              <div className="insight-card" key={i}>
                <div className="card-image-wrapper">
                  <img
                    ref={(el) => (imageRefs.current[imageIndex++] = el)}
                    data-src={card.img}
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23cbd5e1' width='400' height='300'/%3E%3C/svg%3E"
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={`insight-badge badge-${card.color}`}>
                    {card.tag}
                  </span>
                </div>

                <div className="card-details">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>

                  {card.link ? (
                    <Link to={card.link} className="action-btn">
                      Explore Analytics <span>→</span>
                    </Link>
                  ) : (
                    <div className="status-label">
                      <span className="dot"></span> Research Ongoing
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default CardSection;
