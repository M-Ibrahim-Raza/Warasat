"use client"

import { useState } from "react"

const Login = ({ onLogin }) => {
  const [selectedType, setSelectedType] = useState("user")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please enter your name")
      return
    }
    onLogin(selectedType, name)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-10">
      <div className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome to the Chat System</h2>
          <p className="text-gray-600">Please select your role to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Role:</label>
            <div className="flex gap-4">
              <div
                className={`flex-1 p-4 border rounded-lg cursor-pointer ${
                  selectedType === "user" ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
                onClick={() => setSelectedType("user")}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    checked={selectedType === "user"}
                    onChange={() => setSelectedType("user")}
                    className="mr-2"
                  />
                  <div>
                    <h3 className="font-bold">Regular User</h3>
                    <p className="text-sm text-gray-600">Seek verification for inheritance calculations</p>
                  </div>
                </div>
              </div>

              <div
                className={`flex-1 p-4 border rounded-lg cursor-pointer ${
                  selectedType === "ulema" ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
                onClick={() => setSelectedType("ulema")}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    checked={selectedType === "ulema"}
                    onChange={() => setSelectedType("ulema")}
                    className="mr-2"
                  />
                  <div>
                    <h3 className="font-bold">Islamic Scholar (Ulema)</h3>
                    <p className="text-sm text-gray-600">Verify inheritance calculations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={selectedType === "ulema" ? "Sheikh Abdullah Ahmad" : "Your name"}
            />
            {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
