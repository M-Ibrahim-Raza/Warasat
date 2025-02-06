import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  const handleClick = () => {
    setFade(true);
    setTimeout(() => navigate("/home"), 600);
  };

  return (
    <div
      className={`bg-TCLG2 w-screen h-screen flex items-center justify-center cursor-pointer ${
        fade ? "opacity-10" : "opacity-100"
      } transition-opacity duration-500`}
      onClick={handleClick}
    >
      <div className="Center">
        <div className="Logo flex items-center justify-center">
          <img
            className="scale-110"
            src="./Warasat Logo.png"
            alt="Warasat Logo"
          />
        </div>
        <h1 className="font-bold text-4xl text-TCDG1 text-center pt-4">
          Warasat
        </h1>
        <p className="text-3xl font-light text-TCDG1 text-center pt-2">
          Islamic Inheritance Calculator
        </p>
      </div>
    </div>
  );
};

export default Splash;
