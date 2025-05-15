"use client"
import "../src/index.css"
import { useAuth } from "../src/context/AuthContext"
import { Link } from "react-router-dom"

const NavBar = () => {
  const { currentUser, logout } = useAuth()
  const nav_css =
    "text-TCLG1 flex items-center justify-center px-10 hover:bg-TCDG1 hover:bg-opacity-30 font-semibold text-xl transition-all duration-200 hover:scale-105 hover:text-white"
  return (
    <>
      <nav className="bg-TCDG2 h-16 flex overflow-hidden">
        <div className={`md:ml-4 ${nav_css}`}>
          <Link to="/" className="">
            Home
          </Link>
        </div>
        <div className={`${nav_css}`}>
          <Link to="/api-test" className="">
            API Test
          </Link>
        </div>
        <div className="flex items-center justify-center ml-auto ">
          {currentUser ? (
            <>
              <div className={`${nav_css}`}>
                <span className="text-TCLG1">{currentUser.name}</span>
              </div>
              <div className={`${nav_css}`}>
                <button onClick={logout} className="text-TCLG1">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className={`${nav_css}`}>
              <Link to="/login" className="text-TCLG1">
                Login
              </Link>
            </div>
          )}
          <div className={`${nav_css} w-full h-full`}>
            <a href="/info" className="">
              <img className="w-10 " src="./globe.png" alt="info" />
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
