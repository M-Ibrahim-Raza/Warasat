"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import Heading from "../../Components/Heading"
import Button from "../../Components/Button"

// Update the API_URL to match your Flask backend
const API_URL = "http://localhost:3000" // Changed from port 6000 to 8080

const Chat = () => {
  const { chatId } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [chatDetails, setChatDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)

  const { currentUser, getAuthHeader } = useAuth()
  const messagesEndRef = useRef(null)

  // Fetch chat details and messages
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        console.log("Fetching chat data for chat ID:", chatId)
        console.log("Using auth headers:", getAuthHeader())

        // Get chat details
        const detailsResponse = await axios.get(`${API_URL}/chats/${chatId}`, {
          headers: getAuthHeader(),
        })

        if (detailsResponse.data.success) {
          console.log("Chat details fetched successfully:", detailsResponse.data.chat)
          setChatDetails(detailsResponse.data.chat)
        } else {
          console.error("Failed to fetch chat details:", detailsResponse.data.message)
          setError("Failed to fetch chat details: " + detailsResponse.data.message)
        }

        // Get messages
        const messagesResponse = await axios.get(`${API_URL}/chats/${chatId}/messages`, {
          headers: getAuthHeader(),
        })

        if (messagesResponse.data.success) {
          console.log("Messages fetched successfully:", messagesResponse.data.messages)
          setMessages(messagesResponse.data.messages)
        } else {
          console.error("Failed to fetch messages:", messagesResponse.data.message)
          setError("Failed to fetch messages: " + messagesResponse.data.message)
        }
      } catch (err) {
        console.error("Error fetching chat data:", err)
        setError("Failed to load chat data: " + (err.response?.data?.message || err.message))
      } finally {
        setLoading(false)
      }
    }

    fetchChatData()

    // Poll for new messages every 5 seconds
    const interval = setInterval(() => {
      fetchMessages()
    }, 5000)

    return () => clearInterval(interval)
  }, [chatId, getAuthHeader])

  // Fetch only messages (for polling)
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/chats/${chatId}/messages`, {
        headers: getAuthHeader(),
      })

      if (response.data.success) {
        setMessages(response.data.messages)
      } else {
        console.error("Error fetching messages:", response.data.message)
      }
    } catch (err) {
      console.error("Error fetching messages:", err)
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Improve error handling in handleSendMessage
  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    setSending(true)

    try {
      console.log("Sending message:", newMessage)
      console.log("Using auth headers:", getAuthHeader())

      const response = await axios.post(
        `${API_URL}/chats/${chatId}/messages`,
        { content: newMessage },
        { headers: getAuthHeader() },
      )

      if (response.data.success) {
        console.log("Message sent successfully")
        setNewMessage("")
        fetchMessages()
      } else {
        console.error("Failed to send message:", response.data.message)
        setError("Failed to send message: " + response.data.message)
      }
    } catch (err) {
      console.error("Error sending message:", err)
      setError("Failed to send message: " + (err.response?.data?.message || err.message))
    } finally {
      setSending(false)
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
      <Heading className="w-[35rem]">
        {chatDetails
          ? currentUser.user_type === "user"
            ? `Consultation with ${chatDetails.ulema_name}`
            : `Consultation with ${chatDetails.user_name}`
          : "Chat"}
      </Heading>

      <div className="bg-white/60 p-4 rounded-xl mt-4 mx-auto max-w-4xl flex flex-col h-[70vh]">
        {error && <div className="bg-TCR1/20 text-TCR1 p-3 rounded-md mb-4 text-center font-semibold">{error}</div>}

        <div className="flex-1 overflow-y-auto mb-4 p-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender_type === "system"
                  ? "flex justify-center"
                  : message.sender_id === currentUser.id
                    ? "flex justify-end"
                    : "flex justify-start"
              }`}
            >
              {message.sender_type === "system" ? (
                <div className="bg-gray-200 text-TCDG2 px-4 py-2 rounded-lg max-w-[80%]">
                  <p className="text-sm italic">{message.content}</p>
                </div>
              ) : (
                <div
                  className={`px-4 py-2 rounded-lg max-w-[80%] ${
                    message.sender_id === currentUser.id ? "bg-TCDG1 text-white" : "bg-TCLG1 text-TCDG2"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 text-right mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 bg-TCLG1/60 border-2 border-TCDG1 rounded-lg text-TCDG2 focus:outline-none focus:ring-2 focus:ring-TCDG1"
            disabled={sending}
          />
          <Button type="submit" className="!py-2 !px-6" disabled={sending || !newMessage.trim()}>
            {sending ? "Sending..." : "Send"}
          </Button>
        </form>
      </div>

      <div className="flex justify-center mt-4">
        <Link to={currentUser.user_type === "user" ? "/inheritance-calculation" : "/ulema-dashboard"}>
          <Button className="!py-2">
            {currentUser.user_type === "user" ? "Back to Results" : "Back to Dashboard"}
          </Button>
        </Link>
      </div>
    </>
  )
}

export default Chat
