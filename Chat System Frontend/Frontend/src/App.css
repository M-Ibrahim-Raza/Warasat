import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Splash from "./Splash";
import Home from "./Pages/Home";
import NavBar from "../Components/NavBar";
import ChatBot from "../Components/ChatBot";
import Calculator from "./Pages/Calculator";
import Test from "./Pages/Test";
import Test2 from "./Pages/Test2";
import Test3 from "./Pages/Test3";
import { CalculateHeirs } from "./Pages/CalculateHeirs";
import Calculation from "./Pages/Calculation";

const AppWrapper = () => {
  // const location = useLocation();

  // let path = location.pathname
  // console.log(path)
  // let body_styling = (path === "/") ? "w-screenh-screen" : "";
  // // const BodyStyling
  // ${ body_styling }
  return (
    <>
      <body className={`bg-TCLG2 min-h-screen max-h-full`}>
        <ChatBot></ChatBot>
        <NavBar></NavBar>
        <Routes>
          {/* <Route path="/" element={<Splash />} />{" "} */}
          <Route path="/" element={<Home />} />{" "}
          <Route path="/inheritance-calculator" element={<Calculator />} />
          <Route
            path="/inheritance-calculator-heirs"
            element={<CalculateHeirs />}
          />
          <Route path="/inheritance-calculation" element={<Calculation />} />
          <Route path="/test" element={<Test />}></Route>
          <Route path="/test2" element={<Test2 />}></Route>
          <Route path="/test3" element={<Test3 />}></Route>
        </Routes>
      </body>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
