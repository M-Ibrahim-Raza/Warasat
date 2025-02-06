import React from "react";
import NavBar from "../Components/NavBar";
import Button from "../Components/Button";
import ChatBot from "../Components/ChatBot";

const Home = () => {
  return (
    <body className="bg-TCLG2 w-screen h-screen">
      <NavBar></NavBar>
      <ChatBot></ChatBot>
      <div className="Center pt-4">
        <div className="Logo flex items-center justify-center">
          <img src="./Warasat Logo.png" alt="Warasat Logo" />
        </div>
        <h1 className="font-Montserrat font-bold text-4xl text-TCDG2 text-center pb-6 drop-shadow-lg">
          Warasat
        </h1>
      </div>
      <div className="mb-12 Buttons mx-4">
        <div className="flex justify-center items-center mb-4">
          <Button className="w-[30rem] py-8">
            Islamic Inheritance Calculator
          </Button>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Button className="w-64">Ayahs</Button>
          <Button className="w-64">Hadiths</Button>
          <Button className="w-64">Info</Button>
        </div>
      </div>
    </body>
  );
};

export default Home;
