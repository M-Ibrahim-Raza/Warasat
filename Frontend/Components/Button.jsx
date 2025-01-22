import React from "react";

const Button = ({ className, children }) => {
  return (
    <>
      <button
        className={`px-4 bg-text_color text-white font-semibold text-xl py-6 rounded-lg mx-4 border-background_color_dark_green border-2 shadow-slate-600 shadow-md hover:bg-background_color_dark_green hover:scale-105 hover:border-text_color hover:shadow-none transition-all ease-in-out duration-150 ${className}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
