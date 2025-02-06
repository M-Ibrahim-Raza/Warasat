import React from "react";

const Button = ({ className, children }) => {
  return (
    <>
      <button
        className={`px-4 bg-TCDG1 text-white font-semibold text-xl py-5 md:py-6 rounded-lg mx-4 border-TCDG2 border-2 shadow-TCDG2 shadow-md hover:bg-TCDG2 hover:scale-105 hover:border-TCDG1 hover:shadow-none hover:rounded-2xl transition-all ease-in-out duration-200 ${className}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
