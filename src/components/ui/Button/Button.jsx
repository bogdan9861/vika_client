import React from "react";

import "./Button.scss";

const Button = ({ className = "", children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl shadow hover:opacity-80 transition bg-blue-600 text-white font-medium ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
