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

// Auth and Chat imports
import { AuthProvider, ProtectedRoute } from "./context/AuthContext";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Chat from "./Pages/Chat";
import UlemaSelection from "./Pages/UlemaSelection";
import UlemaDashboard from "./Pages/UlemaDashboard";

const AppWrapper = () => {
  const location = useLocation();
  
  // Hide NavBar and ChatBot on auth pages and chat pages
  const hideNavPaths = ["/login", "/signup", "/ulema-dashboard"];
  const isChatPage = location.pathname.startsWith("/chat/");
  const isAuthPage = hideNavPaths.includes(location.pathname);
  const hideNav = isAuthPage || isChatPage;

  return (
    <>
      <div className={`bg-TCLG2 min-h-screen max-h-full`}>
        {!hideNav && <ChatBot />}
        {!hideNav && <NavBar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Calculator Routes (no auth required) */}
          <Route path="/inheritance-calculator" element={<Calculator />} />
          <Route
            path="/inheritance-calculator-heirs"
            element={<CalculateHeirs />}
          />
          <Route path="/inheritance-calculation" element={<Calculation />} />
          
          {/* Protected Routes - Require Login */}
          <Route
            path="/consult-ulema"
            element={
              <ProtectedRoute>
                <UlemaSelection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:chatId"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          
          {/* Ulema-only Route */}
          <Route
            path="/ulema-dashboard"
            element={
              <ProtectedRoute requireUlema>
                <UlemaDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Test Routes */}
          <Route path="/test" element={<Test />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/test3" element={<Test3 />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
};

export default App;
