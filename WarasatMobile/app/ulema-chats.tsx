"use client"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Stack, router } from "expo-router"
import { useSelector } from "react-redux"
import axios from "axios"
import Navbar from "../components/Navbar"
import { API_URL } from "../config/api"
import type { RootState } from "../store/store"

interface Chat {
  id: string
  user_name: string
  last_message: string
  last_message_time: string
  unread_count: number
}

export default function UlemaChats() {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (user?.userType !== "ulema") {
      Alert.alert("Access Denied", "Only Ulemas can access this page")
      router.replace("/")
      return
    }

    fetchChats()
  }, [])

  const fetchChats = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/ulema/chats`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      setChats(response.data.chats)
    } catch (error) {
      console.error("Error fetching chats:", error)
      Alert.alert("Error", "Failed to load chats. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const openChat = (chatId: string) => {
    router.push({
      pathname: "/chat",
      params: { chatId },
    } as any)
  }

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity style={styles.chatCard} onPress={() => openChat(item.id)}>
      <View style={styles.chatInfo}>
        <Text style={styles.userName}>{item.user_name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.last_message}
        </Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.timeText}>
          {new Date(item.last_message_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
        {item.unread_count > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{item.unread_count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />

      <View style={styles.content}>
        <Text style={styles.title}>Your Chats</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#006466" />
            <Text style={styles.loadingText}>Loading chats...</Text>
          </View>
        ) : chats.length > 0 ? (
          <FlatList
            data={chats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatsList}
            onRefresh={fetchChats}
            refreshing={loading}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No chats available</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={fetchChats}>
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8f3dc",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003049",
    textAlign: "center",
    marginVertical: 16,
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
  chatsList: {
    paddingBottom: 20,
  },
  chatCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chatInfo: {
    flex: 1,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003049",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
  chatMeta: {
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: "#006466",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: "#006466",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
})
