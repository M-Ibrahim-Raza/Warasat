"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Heading from "../../Components/Heading"
import Button from "../../Components/Button"

// Make sure this matches your Flask backend URL
const API_URL = "http://localhost:3000" // Changed from port 6000 to 8080

const ApiTest = () => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [networkStatus, setNetworkStatus] = useState(null)

  // Check network connectivity on component mount
  useEffect(() => {
    const checkNetwork = () => {
      setNetworkStatus(navigator.onLine ? "online" : "offline")
    }

    checkNetwork()
    window.addEventListener("online", checkNetwork)
    window.addEventListener("offline", checkNetwork)

    return () => {
      window.removeEventListener("online", checkNetwork)
      window.removeEventListener("offline", checkNetwork)
    }
  }, [])

  const testApi = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    console.log("Testing API connection to:", API_URL)

    try {
      // First, try a simple fetch to check if the server is reachable
      const fetchResult = await fetch(`${API_URL}/test`, { mode: "cors" })
        .then((res) => {
          console.log("Fetch response status:", res.status)
          return res.ok
        })
        .catch((err) => {
          console.error("Fetch error:", err)
          return false
        })

      if (!fetchResult) {
        console.log("Fetch test failed, trying axios...")
      }

      // Now try with axios
      console.log("Sending axios request to:", `${API_URL}/test`)
      const result = await axios.get(`${API_URL}/test`, {
        timeout: 5000, // 5 second timeout
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      console.log("Axios response received:", result)
      setResponse(result.data)
    } catch (err) {
      console.error("API Test Error:", err)

      // Detailed error information
      let errorMessage = "Failed to connect to API"

      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = `Server responded with error ${err.response.status}: ${err.response.data?.message || JSON.stringify(err.response.data)}`
        console.error("Error response data:", err.response.data)
        console.error("Error response status:", err.response.status)
        console.error("Error response headers:", err.response.headers)
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = "No response received from server. Server might be down or CORS might be misconfigured."
        console.error("Error request:", err.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = `Error setting up request: ${err.message}`
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Heading className="w-[35rem]">API Connection Test</Heading>

      <div className="bg-white/60 p-6 rounded-xl mt-4 mx-auto max-w-md">
        <div className="mb-4">
          <p className="text-center text-TCDG2 mb-2">
            Network Status:{" "}
            <span className={networkStatus === "online" ? "text-green-600" : "text-red-600"}>
              {networkStatus === "online" ? "Online" : "Offline"}
            </span>
          </p>
          <p className="text-center text-TCDG2 mb-4">
            Testing connection to: <span className="font-mono text-TCDG1">{API_URL}</span>
          </p>
          <div className="flex justify-center">
            <Button onClick={testApi} className="!py-2" disabled={loading}>
              {loading ? "Testing..." : "Test API Connection"}
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
            <h3 className="font-bold">API Response:</h3>
            <pre className="mt-2 whitespace-pre-wrap overflow-auto max-h-40">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

        <div className="mt-4">
          <h3 className="font-semibold text-TCDG2 mb-2">API Connection Troubleshooting:</h3>
          <ul className="list-disc pl-5 text-TCDG2/80 space-y-1">
            <li>Make sure the Flask backend is running on port 8080</li>
            <li>Check that CORS is properly configured on the backend</li>
            <li>Verify network connectivity between frontend and backend</li>
            <li>Check browser console (F12) for any errors</li>
            <li>Try running both frontend and backend on the same machine</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ApiTest
