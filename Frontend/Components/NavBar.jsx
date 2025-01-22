import React from "react";
import "../src/index.css";

const NavBar = () => {
  return (
    <>
      <nav className="bg-background_color_dark_green h-14 flex">
        <div className="text-white flex items-center justify-center hover:scale-105 hover:text-background_color transition-all duration-100">
          <a href="/about" className="font-semibold text-xl px-6 ml-6">
            About
          </a>
        </div>
        <div className="text-white flex items-center justify-center hover:scale-105 hover:text-background_color transition-all duration-100">
          <a href="/Contact" className="font-semibold text-xl px-6 mx-6">
            Contact Us
          </a>
        </div>
        <div className="flex items-center justify-center ml-auto ">
          <a href="/info" className="px-6 mx-6">
            <img className="w-10" src="./globe.png" alt="info" />
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
