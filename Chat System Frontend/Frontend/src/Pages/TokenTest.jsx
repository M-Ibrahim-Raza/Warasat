"use client"

import { useState, useEffect } from "react"
import Heading from "../../Components/Heading"
import Button from "../../Components/Button"

const TokenTest = () => {
  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // Get token and user data from localStorage
    const storedToken = localStorage.getItem("token")
    const storedUserData = localStorage.getItem("user")

    setToken(storedToken)

    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData))
      } catch (e) {
        console.error("Error parsing user data:", e)
        setUserData(null)
      }
    }
  }, [])

  const clearToken = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUserData(null)
  }

  const setDummyToken = () => {
    const dummyToken = "test_token_" + Date.now()
    const dummyUser = {
      id: "test_id",
      name: "Test User",
      email: "test@example.com",
      user_type: "user",
    }

    localStorage.setItem("token", dummyToken)
    localStorage.setItem("user", JSON.stringify(dummyUser))

    setToken(dummyToken)
    setUserData(dummyUser)
  }

  return (
    <>
      <Heading className="w-[35rem]">Token Test</Heading>
      <div className="bg-white/60 p-6 rounded-xl mt-4 mx-auto max-w-md">
        <h2 className="text-xl font-semibold text-TCDG2 mb-4">Authentication Token Status</h2>

        <div className="mb-4 p-3 bg-TCLG1/50 rounded-md">
          <p className="font-semibold">Token:</p>
          <p className="break-all">{token ? `${token.substring(0, 10)}...` : "No token found"}</p>

          <p className="font-semibold mt-3">User Data:</p>
          <pre className="text-sm overflow-auto max-h-40">
            {userData ? JSON.stringify(userData, null, 2) : "No user data found"}
          </pre>
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={clearToken} className="!py-2">
            Clear Token
          </Button>
          <Button onClick={setDummyToken} className="!py-2">
            Set Test Token
          </Button>
        </div>
      </div>
    </>
  )
}

export default TokenTest
