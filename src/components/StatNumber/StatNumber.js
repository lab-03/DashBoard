import React from "react";

const StatNumber = ({ stat }) => {
  return (
    <div className="ma3">
      <span
        style={{
          fontFamily: ["Cairo", "sans-serif"],
          color: "#faa551",
          fontSize: "90%"
        }}
      >
        {stat.title}
      </span>
      <div
        style={{
          fontFamily: ["Alfa Slab One", "cursive"],
          color: "#7f7aea",
          fontSize: "50px",
          marginLeft: "2%"
        }}
      >
        {stat.value}
      </div>
    </div>
  );
};

export default StatNumber;
