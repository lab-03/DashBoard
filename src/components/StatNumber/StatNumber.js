import React from "react";

const StatNumber = ({ text, value }) => {
  return (
    <div>
      <span
        style={{
          fontFamily: ["Cairo", "sans-serif"],
          color: "#faa551",
          fontSize: "120%"
        }}
      >
        {text}
      </span>
      <div
        style={{
          fontFamily: ["Alfa Slab One", "cursive"],
          color: "#7f7aea",
          fontSize: "200%"
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default StatNumber;
