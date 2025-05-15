import React from "react";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="Center pt-4">
        <div className="Logo flex items-center justify-center">
          <img src="./Warasat Logo.png" alt="Warasat Logo" />
        </div>
        <h1 className="pb-6 text-4xl font-Montserrat font-bold text-TCDG2 text-center drop-shadow-lg">
          Warasat
        </h1>
      </div>
      <div className="mb-12 mx-4 Buttons">
        <div className="flex mb-4 justify-center items-center">
          <Link to={"/inheritance-calculator"}>
            <Button className="w-[30rem] py-8">
              Islamic Inheritance Calculator
            </Button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Button className="w-64">Ayahs</Button>
          <Button className="w-64">Hadiths</Button>
          <Button className="w-64">Info</Button>
        </div>
      </div>
    </>
  );
};

export default Home;
