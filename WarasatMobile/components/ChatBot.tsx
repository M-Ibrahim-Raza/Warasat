"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { MessageCircle, Send } from "lucide-react-native"

interface Message {
  sender: "user" | "bot"
  text: string
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    setLoading(true)

    const userMessage: Message = { sender: "user", text: input }
    setMessages((prev) => [...prev, userMessage])

    try {
      const response = await fetch("http://127.0.0.1:5000/get_answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      })

      const data = await response.json()

      const botMessage: Message = { sender: "bot", text: data.answer || "Error getting response" }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error contacting server." }])
    }

    setInput("")
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.chatButton} onPress={() => setIsOpen(!isOpen)} activeOpacity={0.8}>
        <MessageCircle color="white" size={24} />
        <Text style={styles.chatButtonText}>Chat Bot</Text>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.chatContainer}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatHeaderText}>Warasat Chat Bot</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
              {messages.map((msg, index) => (
                <View
                  key={index}
                  style={[styles.messageBubble, msg.sender === "user" ? styles.userMessage : styles.botMessage]}
                >
                  <Text style={msg.sender === "user" ? styles.userMessageText : styles.botMessageText}>{msg.text}</Text>
                </View>
              ))}
              {loading && (
                <View style={[styles.messageBubble, styles.botMessage]}>
                  <ActivityIndicator size="small" color="#003049" />
                </View>
              )}
            </ScrollView>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Ask a question..."
                  placeholderTextColor="#999"
                  onSubmitEditing={sendMessage}
                />
                <TouchableOpacity
                  style={[styles.sendButton, !input.trim() && styles.disabledButton]}
                  onPress={sendMessage}
                  disabled={!input.trim() || loading}
                >
                  <Send color="white" size={20} />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  chatButton: {
    backgroundColor: "#003049",
    borderRadius: 30,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chatButtonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  chatContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#003049",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chatHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  closeButton: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messagesContent: {
    paddingBottom: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#006466",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
  },
  userMessageText: {
    color: "white",
  },
  botMessageText: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#006466",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
})

export default ChatBot
