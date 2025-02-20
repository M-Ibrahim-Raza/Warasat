import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router components
import Splash from "./Splash";
import Home from "./Pages/Home";
import NavBar from "../Components/NavBar";
import ChatBot from "../Components/ChatBot";
import Calculator from "./Pages/Calculator";
import Test from "./Pages/Test";
import Test2 from "./Pages/Test2";

const App = () => {
  return (
    <>
      <body className="bg-TCLG2 w-screen h-screen">
        <ChatBot></ChatBot>
        <NavBar></NavBar>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Splash />} />{" "} */}
            <Route path="/" element={<Home />} />{" "}
            <Route path="/inheritance-calculator" element={<Calculator />} />
            <Route path="/test" element={<Test />}></Route>
            <Route path="/test2" element={<Test2 />}></Route>
          </Routes>
        </Router>
      </body>
    </>
  );
};

export default App;
