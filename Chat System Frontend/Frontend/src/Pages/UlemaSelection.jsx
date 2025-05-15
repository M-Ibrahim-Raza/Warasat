"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { useSelector } from "react-redux"
import Heading from "../../Components/Heading"
import Button from "../../Components/Button"

// Update the API_URL to match your Flask backend
const API_URL = "http://localhost:3000"

const UlemaSelection = () => {
  const [ulemas, setUlemas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedUlema, setSelectedUlema] = useState(null)
  // Add a loading state for the button action
  const [buttonLoading, setButtonLoading] = useState(false)

  const { getAuthHeader } = useAuth()
  const navigate = useNavigate()

  // Get inheritance data from Redux store
  const amount = useSelector((state) => state.details.amount)
  const funeralExpenses = useSelector((state) => state.details.funeralExpenses)
  const mehr = useSelector((state) => state.details.mehr)
  const debt = useSelector((state) => state.details.debt)
  const will = useSelector((state) => state.details.will)
  const currency = useSelector((state) => state.details.currency)
  const gender = useSelector((state) => state.options.gender)
  const heirSharesList = useSelector((state) => state.heirs.heirSharesList)

  // Improve error handling in fetchUlemas
  const fetchUlemas = async () => {
    try {
      console.log("Fetching ulemas with headers:", getAuthHeader())
      const response = await axios.get(`${API_URL}/ulemas`, {
        headers: getAuthHeader(),
      })

      if (response.data.success) {
        console.log("Ulemas fetched successfully:", response.data.ulemas)
        setUlemas(response.data.ulemas)
      } else {
        console.error("Failed to fetch ulemas:", response.data.message)
        setError("Failed to fetch ulemas: " + response.data.message)
      }
    } catch (err) {
      console.error("Error fetching ulemas:", err)
      setError("An error occurred while fetching ulemas: " + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUlemas()
  }, [getAuthHeader])

  // Improve error handling in handleStartChat
  const handleStartChat = async () => {
    if (!selectedUlema) return

    try {
      setButtonLoading(true) // Add loading state while processing
      setError("") // Clear any previous errors

      const inheritanceData = {
        total_amount: amount,
        funeral_expenses: funeralExpenses,
        mehr: mehr,
        debt: debt,
        will: will,
        currency: currency,
        gender: gender,
        heir_shares: heirSharesList,
      }

      console.log("Starting chat with ulema ID:", selectedUlema)
      console.log("Inheritance data:", inheritanceData)
      console.log("Auth headers:", getAuthHeader())

      // First check if we have a valid token
      const token = localStorage.getItem("token")
      if (!token) {
        setError("Authentication token is missing. Please log in again.")
        setButtonLoading(false)
        return
      }

      const response = await axios.post(
        `${API_URL}/chats/start`,
        {
          ulema_id: selectedUlema,
          inheritance_data: inheritanceData, // Stringify the object
        },
        {
          headers: getAuthHeader(),
        },
      )

      console.log("Chat start response:", response.data)

      if (response.data.success) {
        console.log("Chat started successfully, navigating to:", `/chat/${response.data.chat_id}`)
        navigate(`/chat/${response.data.chat_id}`)
      } else {
        console.error("Failed to start chat:", response.data.message)
        setError("Failed to start chat: " + response.data.message)
      }
    } catch (err) {
      console.error("Error starting chat:", err)

      // More detailed error logging
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", err.response.data)
        console.error("Error response status:", err.response.status)
        console.error("Error response headers:", err.response.headers)
        setError(
          `Server error (${err.response.status}): ${err.response.data?.message || JSON.stringify(err.response.data)}`,
        )
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received:", err.request)
        setError("No response received from server. Server might be down or unreachable.")
      } else {
        // Something happened in setting up the request
        setError(`Error: ${err.message}`)
      }
    } finally {
      setButtonLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-TCDG1"></div>
      </div>
    )
  }

  return (
    <>
      <Heading className="w-[35rem]">Select an Ulema for Verification</Heading>
      <div className="bg-white/60 p-6 rounded-xl mt-4 mx-auto max-w-3xl">
        {error && <div className="bg-TCR1/20 text-TCR1 p-3 rounded-md mb-4 text-center font-semibold">{error}</div>}

        <p className="text-TCDG2 text-center mb-6">
          Select an Ulema to verify your inheritance calculation and ask questions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ulemas.map((ulema) => (
            <div
              key={ulema.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedUlema === ulema.id ? "border-TCDG1 bg-TCDG1/10" : "border-TCDG2/30 hover:border-TCDG2"
              }`}
              onClick={() => setSelectedUlema(ulema.id)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-12 h-12 bg-TCDG2 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {ulema.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-TCDG2">{ulema.name}</h3>
                  <p className="text-sm text-TCDG2/70">{ulema.expertise}</p>
                  <div className="flex items-center mt-1">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${ulema.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                    ></div>
                    <span className="text-xs text-TCDG2/70">{ulema.isOnline ? "Online" : "Offline"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {error && (
            <div className="w-full bg-TCR1/20 text-TCR1 p-3 rounded-md mb-4 text-center font-semibold">{error}</div>
          )}
          <Button
            onClick={handleStartChat}
            disabled={!selectedUlema || buttonLoading}
            className={`!py-2 ${!selectedUlema || buttonLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {buttonLoading ? "Starting..." : "Start Consultation"}
          </Button>
        </div>
      </div>
    </>
  )
}

export default UlemaSelection
