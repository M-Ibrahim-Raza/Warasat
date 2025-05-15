"use client"

import { useState } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import Heading from "../../Components/Heading"
import Button from "../../Components/Button"

const API_URL = "http://localhost:3000"

const AuthTest = () => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { currentUser, getAuthHeader } = useAuth()

  const testAuth = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      console.log("Testing authentication...")
      console.log("Current user:", currentUser)
      console.log("Auth headers:", getAuthHeader())

      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: getAuthHeader(),
      })

      console.log("Auth test response:", response.data)
      setResponse(response.data)
    } catch (err) {
      console.error("Auth test error:", err)

      if (err.response) {
        setError(
          `Server error (${err.response.status}): ${err.response.data?.message || JSON.stringify(err.response.data)}`,
        )
      } else if (err.request) {
        setError("No response received from server")
      } else {
        setError(`Error: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Heading className="w-[35rem]">Authentication Test</Heading>

      <div className="bg-white/60 p-6 rounded-xl mt-4 mx-auto max-w-md">
        <div className="mb-4">
          <p className="text-center text-TCDG2 mb-2">
            Current User: {currentUser ? currentUser.name : "Not logged in"}
          </p>
          <p className="text-center text-TCDG2 mb-4">User Type: {currentUser ? currentUser.user_type : "N/A"}</p>
          <div className="flex justify-center">
            <Button onClick={testAuth} className="!py-2" disabled={loading}>
              {loading ? "Testing..." : "Test Authentication"}
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-TCDG1"></div>
          </div>
        )}

        {error && (
          <div className="bg-TCR1/20 text-TCR1 p-3 rounded-md mb-4">
            <h3 className="font-bold">Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {response && (
          <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
            <h3 className="font-bold">Response:</h3>
            <pre className="mt-2 whitespace-pre-wrap overflow-auto max-h-40">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthTest
