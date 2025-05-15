"use client"
import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Stack, useLocalSearchParams } from "expo-router"
import { useSelector } from "react-redux"
import axios from "axios"
import { Send } from "lucide-react-native"
import { API_URL } from "../config/api"
import type { RootState } from "../store/store"

interface Message {
  id: string
  sender_id: string
  sender_type: "user" | "ulema"
  content: string
  timestamp: string
}

interface ChatDetails {
  id: string
  ulema_name: string
  user_name: string
  created_at: string
}

export default function Chat() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [chatDetails, setChatDetails] = useState<ChatDetails | null>(null)
  const { user } = useSelector((state: RootState) => state.auth)
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    if (chatId) {
      fetchChatDetails()
      fetchMessages()
      // Set up polling for new messages
      const interval = setInterval(fetchMessages, 5000)
      return () => clearInterval(interval)
    }
  }, [chatId])

  const fetchChatDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/chats/${chatId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      setChatDetails(response.data.chat)
    } catch (error) {
      console.error("Error fetching chat details:", error)
      Alert.alert("Error", "Failed to load chat details")
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/chats/${chatId}/messages`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      setMessages(response.data.messages)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching messages:", error)
      if (loading) {
        setLoading(false)
        Alert.alert("Error", "Failed to load messages")
      }
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      setSending(true)
      const response = await axios.post(
        `${API_URL}/chats/${chatId}/messages`,
        {
          content: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      )

      if (response.data.success) {
        setNewMessage("")
        fetchMessages()
      } else {
        Alert.alert("Error", response.data.message || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      Alert.alert("Error", "Failed to send message")
    } finally {
      setSending(false)
    }
  }

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = user?.userType === item.sender_type && user?.id === item.sender_id
    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.sentMessage : styles.receivedMessage]}>
        <Text style={[styles.messageText, isCurrentUser ? styles.sentMessageText : styles.receivedMessageText]}>
          {item.content}
        </Text>
        <Text style={[styles.timestamp, isCurrentUser ? styles.sentTimestamp : styles.receivedTimestamp]}>
          {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: chatDetails
            ? user?.userType === "user"
              ? `Chat with ${chatDetails.ulema_name}`
              : `Chat with ${chatDetails.user_name}`
            : "Chat",
          headerTitleAlign: "center",
        }}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#006466" />
            <Text style={styles.loadingText}>Loading messages...</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={sending}>
            {sending ? <ActivityIndicator size="small" color="#fff" /> : <Send size={20} color="#fff" />}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#003049",
  },
  messagesList: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#006466",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  messageText: {
    fontSize: 16,
  },
  sentMessageText: {
    color: "#fff",
  },
  receivedMessageText: {
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  sentTimestamp: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "right",
  },
  receivedTimestamp: {
    color: "#999",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#006466",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
})
