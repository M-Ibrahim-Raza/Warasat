import React from "react";

const Heading = ({ children, className }) => {
  return (
    <div id="heading" className="flex px-2">
      <div
        id="heading-background"
        className={`${className} bg-TCLG1 mt-4 py-3 rounded-xl mx-auto border-TCDG1 border-[1px] shadow-sm shadow-TCT1`}
      >
        <h1 className="text-3xl font-Montserrat font-bold text-TCDG2 text-center drop-shadow-lg">
          {children}
        </h1>
      </div>
    </div>
  );
};

export default Heading;
