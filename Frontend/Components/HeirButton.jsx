import React from "react";

const HeirButton = ({ className, children }) => {
  return (
    <>
      <button
        className={`${className} px-4 py-2 text-lg bg-TCLG2 text-TCDG2 font-semibold rounded-lg border-TCDG2 border-[1.75px] shadow-TCDG2 shadow-sm hover:bg-TCDG2 hover:scale-105 hover:border-TCDG1 hover:shadow-none hover:text-TCLG1 hover:rounded-2xl transition-all ease-in-out duration-200`}
      >
        {children}
      </button>
    </>
  );
};

export default HeirButton;
