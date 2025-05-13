// Base URL for the Flask API
const API_BASE_URL = "http://localhost:5000"

// Chat service functions
const chatService = {
  // Get all messages
  getMessages: async (chatId = "default") => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: "msg-1",
              sender: "user",
              text: "Assalamu alaikum, I'd like to verify my inheritance calculation with you.",
              timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            },
          ])
        }, 500)
      })

      // Uncomment this for real API integration
      /*
      const response = await axios.get(`${API_BASE_URL}/get_messages?chat_id=${chatId}`)
      if (response.data && Array.isArray(response.data)) {
        return response.data.map((msg, index) => ({
          id: `msg-${index}`,
          sender: msg.sender === "admin" ? "ulema" : "user",
          text: msg.text,
          timestamp: new Date(msg.timestamp || Date.now()),
        }))
      }
      return []
      */
    } catch (error) {
      console.error("Error fetching messages:", error)
      throw error
    }
  },

  // Send a message
  sendMessage: async (text, chatId = "default") => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: "Message received" })
        }, 500)
      })

      // Uncomment this for real API integration
      /*
      await axios.post(`${API_BASE_URL}/send_message`, { text, chat_id: chatId })
      */
    } catch (error) {
      console.error("Error sending message:", error)
      throw error
    }
  },

  // Get a simulated ulema reply
  getUlemaReply: async (text, chatId = "default") => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: "Reply sent" })
        }, 500)
      })

      // Uncomment this for real API integration
      /*
      await axios.post(`${API_BASE_URL}/admin_reply`, { text, chat_id: chatId })
      */
    } catch (error) {
      console.error("Error with admin reply:", error)
      throw error
    }
  },

  // Upload a file (for future implementation)
  uploadFile: async (file, chatId = "default") => {
    // This is a placeholder for future implementation
    // In a real app, you would upload the file to a server and get a URL back
    return URL.createObjectURL(file)
  },

  // Get chat history (for future implementation with authentication)
  getChatHistory: async (userId) => {
    // This is a placeholder for future implementation
    return []
  },
}

export default chatService
