import React from "react";

const Card = ({ className = "", children }) => {
  return (
    <div className={`bg-white rounded-2xl shadow ${className}`}>{children}</div>
  );
};

export default Card;
