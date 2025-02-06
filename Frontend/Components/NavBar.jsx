import React from "react";
import "../src/index.css";

const NavBar = () => {
  const nav_css =
    "text-TCLG1 flex items-center justify-center px-10 hover:bg-TCDG1 hover:bg-opacity-30 font-semibold text-xl transition-all duration-200 hover:scale-105 hover:text-white";
  return (
    <>
      <nav className="bg-TCDG2 h-16 flex overflow-hidden">
        <div className={`md:ml-4 ${nav_css}`}>
          <a href="/about" className="">
            About
          </a>
        </div>
        <div className={`${nav_css}`}>
          <a href="/Contact" className="">
            Contact Us
          </a>
        </div>
        <div className="flex items-center justify-center ml-auto ">
          <div className={`${nav_css} w-full h-full`}>
            <a href="/info" className="">
              <img className="w-10 " src="./globe.png" alt="info" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
