import React from 'react'

const StatsCard = ({title,value,unit}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        margin: "10px",
        width: "200px",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        {value} {unit}
      </p>
    </div>
  );
}

export default StatsCard
