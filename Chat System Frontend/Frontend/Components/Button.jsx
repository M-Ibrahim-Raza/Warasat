import React from "react";

const Button = ({ className, children }) => {
  return (
    <>
      <button
        className={`${className} mx-4 px-4 py-5 text-xl bg-TCDG1 text-white font-semibold md:py-6 rounded-lg border-TCDG2 border-2 shadow-TCDG2 shadow-md hover:bg-TCDG2 hover:scale-105 hover:border-TCDG1 hover:shadow-none hover:rounded-2xl transition-all ease-in-out duration-200`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
