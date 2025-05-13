"use client"

import { useState, useEffect } from "react"
import ChatInterface from "./ChatInterface"

const UlemaDashboard = ({ username }) => {
  const [activeChats, setActiveChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for active chats
  useEffect(() => {
    const fetchChats = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call to get the ulema's active chats
        // For now, we'll use mock data
        setTimeout(() => {
          const mockChats = [
            {
              id: "chat1",
              userId: "user1",
              userName: "Ahmed Khan",
              lastMessage: "I'd like to verify my inheritance calculation with you.",
              timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
              unread: 2,
              hasAttachments: true,
            },
            {
              id: "chat2",
              userId: "user2",
              userName: "Fatima Ali",
              lastMessage: "Thank you for your help with my inheritance questions.",
              timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
              unread: 0,
              hasAttachments: true,
            },
            {
              id: "chat3",
              userId: "user3",
              userName: "Mohammad Rahman",
              lastMessage: "Can you explain how the shares are calculated for my case?",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
              unread: 1,
              hasAttachments: false,
            },
          ]
          setActiveChats(mockChats)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching chats:", error)
        setIsLoading(false)
      }
    }

    fetchChats()
  }, [])

  const handleSelectChat = (chat) => {
    // Mark chat as read
    setActiveChats(activeChats.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)))

    // Create a mock ulema object for the chat interface
    const mockUlema = {
      id: username,
      name: username,
      specialty: "Islamic Inheritance",
      status: "online",
    }

    setSelectedChat({
      ...chat,
      ulema: mockUlema,
    })
  }

  const handleCloseChat = () => {
    setSelectedChat(null)
  }

  const formatTime = (date) => {
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="mt-6">
      {selectedChat ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-green-50 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Chat with {selectedChat.userName}</h2>
            <button onClick={handleCloseChat} className="text-gray-600 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ChatInterface
            isUlemaView={true}
            chatId={selectedChat.id}
            userName={selectedChat.userName}
            ulema={selectedChat.ulema}
            onClose={handleCloseChat}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-green-50 border-b">
            <h2 className="text-xl font-bold text-gray-800">Your Active Chats</h2>
          </div>

          {isLoading ? (
            <div className="p-10 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
              <p>Loading your chats...</p>
            </div>
          ) : activeChats.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-600">You have no active chats at the moment.</p>
            </div>
          ) : (
            <div className="divide-y">
              {activeChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${chat.unread > 0 ? "bg-green-50" : ""}`}
                  onClick={() => handleSelectChat(chat)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                        {chat.userName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium">{chat.userName}</h3>
                        <p className="text-sm text-gray-600 line-clamp-1">{chat.lastMessage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{formatTime(chat.timestamp)}</p>
                      {chat.unread > 0 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-600 rounded-full mt-1">
                          {chat.unread}
                        </span>
                      )}
                      {chat.hasAttachments && (
                        <span className="inline-block ml-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UlemaDashboard
