import React from "react";
import NavBar from "../Components/NavBar";
import Button from "../Components/Button";
import ChatBot from "../Components/ChatBot";

const Home = () => {
  return (
    <body className="bg-background_color w-screen h-screen">
      <NavBar></NavBar>
      <ChatBot></ChatBot>
      <div className="Center pt-6">
        <div className="Logo flex items-center justify-center">
          <img src="./Warasat Logo.png" alt="Warasat Logo" />
        </div>
        <h1 className="font-bold text-3xl text-text_color text-center pb-6">
          Warasat
        </h1>
      </div>
      <div className="Buttons">
        <div className="flex justify-center items-center mb-12">
          <Button className="w-1/4 py-8">Islamic Inheritance Calculator</Button>
        </div>
        <div className="flex justify-center items-center">
          <Button className="w-1/6">Ayahs</Button>
          <Button className="w-1/6">Hadiths</Button>
          <Button className="w-1/6">Info</Button>
        </div>
      </div>
    </body>
  );
};

export default Home;
