import axios from "axios"

// Base URL for the Flask API
const API_BASE_URL = "http://localhost:5000"

// Chat service functions
const chatService = {
  // Get all messages
  getMessages: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get_messages`)

      if (response.data && Array.isArray(response.data)) {
        return response.data.map((msg, index) => ({
          id: `msg-${index}`,
          sender: msg.sender === "admin" ? "ulema" : "user",
          text: msg.text,
          timestamp: new Date(), // API doesn't provide timestamps, so we use current time
        }))
      }

      return []
    } catch (error) {
      console.error("Error fetching messages:", error)
      throw error
    }
  },

  // Send a message
  sendMessage: async (text, attachments) => {
    try {
      // Send the message text to the API
      await axios.post(`${API_BASE_URL}/send_message`, { text })

      // If there are attachments, we can't send them to the API as it doesn't support them
      // But we can include them in the message text
      if (attachments && attachments.length > 0) {
        const attachmentNames = attachments.map((a) => a.name).join(", ")
        await axios.post(`${API_BASE_URL}/send_message`, {
          text: `[Attached files: ${attachmentNames}]`,
        })
      }

      return { status: "Message sent" }
    } catch (error) {
      console.error("Error sending message:", error)
      throw error
    }
  },

  // Send a ulema reply
  sendUlemaReply: async (text) => {
    try {
      await axios.post(`${API_BASE_URL}/admin_reply`, { text })
      return { status: "Reply sent" }
    } catch (error) {
      console.error("Error sending ulema reply:", error)
      throw error
    }
  },

  // Upload a file (mock implementation as API doesn't support it)
  uploadFile: async (file) => {
    // This is a placeholder - the API doesn't support file uploads
    // In a real app, you would upload the file to a server and get a URL back
    return URL.createObjectURL(file)
  },
}

export default chatService
