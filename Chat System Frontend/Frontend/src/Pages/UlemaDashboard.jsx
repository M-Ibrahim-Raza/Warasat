"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import Heading from "../../Components/Heading"
import Button from "../../Components/Button"

// Update the API_URL to match your Flask backend
const API_URL = "http://localhost:3000" // Changed from port 6000 to 8080

const UlemaDashboard = () => {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const { currentUser, getAuthHeader, logout } = useAuth()

  useEffect(() => {
    // Improve error handling in fetchChats
    const fetchChats = async () => {
      try {
        console.log("Fetching ulema chats with headers:", getAuthHeader())
        const response = await axios.get(`${API_URL}/ulema/chats`, {
          headers: getAuthHeader(),
        })

        if (response.data.success) {
          console.log("Chats fetched successfully:", response.data.chats)
          setChats(response.data.chats)
        } else {
          console.error("Failed to fetch chats:", response.data.message)
          setError("Failed to fetch chats: " + response.data.message)
        }
      } catch (err) {
        console.error("Error fetching chats:", err)
        setError("An error occurred while fetching chats: " + (err.response?.data?.message || err.message))
      } finally {
        setLoading(false)
      }
    }

    fetchChats()

    // Poll for updates every 10 seconds
    const interval = setInterval(fetchChats, 10000)

    return () => clearInterval(interval)
  }, [getAuthHeader])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-TCDG1"></div>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center px-4">
        <Heading className="w-[35rem]">Ulema Dashboard</Heading>
        <Button onClick={logout} className="!py-2 !px-6">
          Logout
        </Button>
      </div>

      <div className="bg-white/60 p-6 rounded-xl mt-4 mx-auto max-w-4xl">
        {error && <div className="bg-TCR1/20 text-TCR1 p-3 rounded-md mb-4 text-center font-semibold">{error}</div>}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-TCDG2 mb-2">Welcome, {currentUser?.name}</h2>
          <p className="text-TCDG2/70">
            You have {chats.filter((chat) => chat.unread_count > 0).length} unread consultations
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-TCDG2 border-b border-TCDG2/20 pb-2">Your Consultations</h3>

          {chats.length === 0 ? (
            <p className="text-center text-TCDG2/70 py-8">No consultations yet</p>
          ) : (
            <div className="space-y-3">
              {chats.map((chat) => (
                <Link key={chat.id} to={`/chat/${chat.id}`} className="block">
                  <div className="flex items-center p-3 border border-TCDG2/20 rounded-lg hover:bg-TCLG1/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-semibold text-TCDG2">{chat.user_name}</h4>
                        {chat.unread_count > 0 && (
                          <span className="ml-2 bg-TCDG1 text-white text-xs px-2 py-1 rounded-full">
                            {chat.unread_count} new
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-TCDG2/70 truncate">{chat.last_message}</p>
                      <p className="text-xs text-TCDG2/50">{new Date(chat.last_message_time).toLocaleString()}</p>
                    </div>
                    <div className="text-TCDG2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UlemaDashboard
