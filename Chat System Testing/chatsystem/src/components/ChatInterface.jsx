"use client"

import { useState, useEffect, useRef } from "react"
import chatService from "../services/ChatService"

const ChatInterface = ({
  ulema,
  onClose,
  pdfFile,
  excelFile,
  inheritanceData,
  username,
  isUlemaView,
  chatId,
  userName,
}) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Fetch messages from the server
  const fetchMessages = async () => {
    try {
      // In a real app, this would fetch messages from the API
      // For now, we'll use mock data if we're in ulema view
      if (isUlemaView && chatId) {
        const mockMessages = [
          {
            id: "msg-1",
            sender: "user",
            text: "Assalamu alaikum, I'd like to verify my inheritance calculation with you. I've attached the calculation files for your review.",
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            attachments: [
              {
                name: "Inheritance-Calculation.pdf",
                type: "application/pdf",
                url: "#",
              },
              {
                name: "Inheritance-Calculation.xlsx",
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                url: "#",
              },
            ],
          },
          {
            id: "msg-2",
            sender: "ulema",
            text: "Wa alaikum salam. Thank you for reaching out. I'll review your inheritance calculation and get back to you shortly.",
            timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
          },
          {
            id: "msg-3",
            sender: "user",
            text: "Thank you, Sheikh. I'm particularly concerned about the distribution between my sons and daughters.",
            timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
          },
        ]
        setMessages(mockMessages)
        return
      }

      const response = await chatService.getMessages()
      if (Array.isArray(response)) {
        setMessages(response)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  // Send a message to the server
  const sendMessage = async (text, attachments) => {
    try {
      setIsLoading(true)

      // In a real app, this would send the message to the API
      // await chatService.sendMessage(text)

      // Add message to local state
      const newMsg = {
        id: `msg-${Date.now()}`,
        sender: isUlemaView ? "ulema" : "user",
        text,
        timestamp: new Date(),
        attachments,
      }

      setMessages((prev) => [...prev, newMsg])
      setNewMessage("")

      // Simulate response after a delay if we're not in ulema view
      if (!isUlemaView) {
        setTimeout(() => {
          const responseMsg = {
            id: `msg-${Date.now() + 1}`,
            sender: "ulema",
            text: `Thank you for your message. I'll review your inheritance calculation and get back to you shortly.`,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, responseMsg])
          setIsLoading(false)
        }, 2000)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
    }
  }

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage)
    }
  }

  // Handle pressing Enter to send a message
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initial fetch of messages
  useEffect(() => {
    fetchMessages()
  }, [isUlemaView, chatId])

  // Send files automatically when the chat starts
  useEffect(() => {
    const sendInitialFiles = async () => {
      const attachments = []
      let initialMessage = `Assalamu alaikum, I'd like to verify my inheritance calculation with you.`

      if (pdfFile || excelFile) {
        initialMessage += ` I've attached the calculation files for your review.`

        if (pdfFile) {
          attachments.push({
            name: "Inheritance-Calculation.pdf",
            type: "application/pdf",
            url: URL.createObjectURL(pdfFile),
          })
        }

        if (excelFile) {
          attachments.push({
            name: "Inheritance-Calculation.xlsx",
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            url: URL.createObjectURL(excelFile),
          })
        }
      }

      if (!isUlemaView && messages.length === 0) {
        await sendMessage(initialMessage, attachments.length > 0 ? attachments : undefined)
      }
    }

    sendInitialFiles()
  }, [pdfFile, excelFile, isUlemaView])

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === (isUlemaView ? "ulema" : "user") ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === (isUlemaView ? "ulema" : "user") ? "bg-green-600 text-white" : "bg-gray-200"
              }`}
            >
              <p>{message.text}</p>

              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white/20 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-sm underline">
                        {attachment.name}
                      </a>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t">
        <div className="flex gap-2">
          <button className="p-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-600"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading}
            className={`px-4 py-2 rounded text-white flex items-center ${
              !newMessage.trim() || isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
