import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../src/index.css";
import { useAuth } from "../src/context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const nav_css =
    "text-TCLG1 flex items-center justify-center px-10 hover:bg-TCDG1 hover:bg-opacity-30 font-semibold text-xl transition-all duration-200 hover:scale-105 hover:text-white";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="bg-TCDG2 h-16 flex overflow-hidden">
        <div className={`md:ml-4 ${nav_css}`}>
          <Link to="/about">About</Link>
        </div>
        <div className={`${nav_css}`}>
          <Link to="/Contact">Contact Us</Link>
        </div>

        {/* Consult Ulema - only for logged in users */}
        {isAuthenticated() && user?.user_type === "user" && (
          <div className={`${nav_css}`}>
            <Link 
              to="/consult-ulema"
              onClick={() => {
                // Clear share flag when going directly to consult ulema (not from calculation)
                localStorage.removeItem("share_inheritance");
              }}
            >
              Consult Ulema
            </Link>
          </div>
        )}

        <div className="flex items-center justify-center ml-auto">
          <div className={`${nav_css} w-full h-full`}>
            <Link to="/info">
              <img className="w-10" src="./globe.png" alt="info" />
            </Link>
          </div>

          {/* Auth Buttons */}
          {isAuthenticated() ? (
            <>
              <div className="text-TCLG1 flex items-center px-4">
                <span className="text-sm opacity-80">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className={`${nav_css} px-6`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={`${nav_css} px-6`}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
