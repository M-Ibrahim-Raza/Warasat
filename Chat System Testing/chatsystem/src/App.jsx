"use client"

import { useState } from "react"
import Login from "./components/Login"
import UserDashboard from "./components/UserDashboard"
import UlemaDashboard from "./components/UlemaDashboard"

function App() {
  const [userType, setUserType] = useState(null) // null, 'user', or 'ulema'
  const [username, setUsername] = useState("")

  const handleLogin = (type, name) => {
    setUserType(type)
    setUsername(name)
  }

  const handleLogout = () => {
    setUserType(null)
    setUsername("")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Islamic Inheritance Chat System</h1>
          {userType && (
            <div className="flex items-center gap-4">
              <span>
                Logged in as: <strong>{username}</strong> ({userType})
              </span>
              <button onClick={handleLogout} className="bg-white text-green-600 px-4 py-1 rounded hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4">
        {!userType ? (
          <Login onLogin={handleLogin} />
        ) : userType === "user" ? (
          <UserDashboard username={username} />
        ) : (
          <UlemaDashboard username={username} />
        )}
      </main>

      <footer className="bg-gray-200 p-4 text-center text-gray-600 mt-8">
        <p>© {new Date().getFullYear()} Islamic Inheritance Chat System - Test Application</p>
      </footer>
    </div>
  )
}

export default App
