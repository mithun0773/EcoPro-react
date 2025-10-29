import React from "react";
import "../CardSection.css";
import { Link } from "react-router-dom";

const CardSection = () => {
  const sections = [
    {
      title: "🌍 Key Economic Indicators",
      cards: [
        {
          img: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
          tag: "Economy",
          title: "GDP Growth Insights",
          desc: "Explore year-over-year GDP changes and their economic implications.",
          color: "blue",
          link: "/gdp",
        },
        {
          img: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
          tag: "Demographics",
          title: "Population Dynamics",
          desc: "Track global population growth, migration trends, and density shifts.",
          color: "green",
          link: "/population",
        },
        {
          img: "https://plus.unsplash.com/premium_photo-1661782589470-6d2e76a36b9d",
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
      cards: [
        {
          img: "https://images.unsplash.com/photo-1560179376-2570140bed14?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
          tag: "Population",
          title: "Population Overview",
          desc: "Analyze the growing global population across continents.",
          color: "teal",
        },
        {
          img: "https://plus.unsplash.com/premium_photo-1680229008398-3a6a89bf71ed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QmlydGh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=1000",
          tag: "Birth",
          title: "Birth Rate Trends",
          desc: "View birth rate changes and their social implications.",
          color: "orange",
          link: "/birth",
        },
        {
          img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=799",
          tag: "Death",
          title: "Mortality & Health",
          desc: "Understand death rate data linked with health systems.",
          color: "gray",
          link: "/health",
        },
        {
          img: "https://images.unsplash.com/photo-1541956799312-3f9df99e0006?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVydGlsaXR5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1000",
          tag: "Fertility",
          title: "Fertility Patterns",
          desc: "Study fertility rate fluctuations and their impact on society.",
          color: "pink",
          link: "/fertility",
        },
      ],
    },
    {
      title: "Sectoral Overview",
      cards: [
        {
          img: "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
          tag: "Sectorial",
          title: "Agriculture Overview",
          desc: "Explore more Indepth about Agriculture and more aspects of Farming and More Overview in GreenHouse Farming",
          color: "pink",
          link:"/agri"
        },
        {
          img: "https://plus.unsplash.com/premium_photo-1681426730828-bfee2d13861d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FyZWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1000",
          tag: "Warehouse",
          title: "Industrial Overview",
          desc: "Explore more Indepth about Industrial Overview and More Aspects About That and WareHouse Management",
          color: "red",
        },
        {
          img: "https://plus.unsplash.com/premium_photo-1678743133487-d501f3b0696b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW5lcmd5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1000",
          tag: "Energy",
          title: "Energy Sector",
          desc: "Explore More indepth about Solar and Energy Overview Over Nuclear Plants and renewable resources",
          color: "green",
        },
        {
          img: "https://images.unsplash.com/photo-1656291716879-295102bc71e3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1wbG95ZW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
          tag: "Employement",
          title: "EmployeMent Sector",
          desc: "Explore more about Employee standards and Employee Overview Over Various Countries and Growth of that.",
          color: "blue",
          link: "/employement",
        },
      ],
    },
  ];

  return (
    <div className="eco-card-wrapper">
      {sections.map((section, index) => (
        <section className="eco-card-section" key={index}>
          <h2 className="eco-section-title">{section.title}</h2>
          <div className="eco-card-container">
            {section.cards.map((card, i) => (
              <div className="eco-card" key={i}>
                <div className="eco-card_header">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="eco-card_image"
                  />
                </div>
                <div className="eco-card_body">
                  <span className={`eco-tag eco-tag-${card.color}`}>
                    {card.tag}
                  </span>
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                  <Link
                    to={card.link}
                    className="inline-block mt-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                  >
                    Visit Site
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CardSection;
