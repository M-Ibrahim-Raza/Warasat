import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router components
import Splash from "./Splash";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />{" "}
        <Route path="/home" element={<Home />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
