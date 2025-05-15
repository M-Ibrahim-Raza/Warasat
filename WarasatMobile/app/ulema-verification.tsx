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

interface Ulema {
  id: string
  name: string
  expertise: string
  isOnline: boolean
}

export default function UlemaVerification() {
  const [ulemas, setUlemas] = useState<Ulema[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state: RootState) => state.auth)
  const heirSharesList = useSelector((state: RootState) => state.heirs.heirSharesList)
  const amount = useSelector((state: RootState) => state.details.amount)
  const total_amount = useSelector((state: RootState) => {
    const funeralExpenses = state.details.funeralExpenses || 0
    const mehr = state.details.mehr || 0
    const debt = state.details.debt || 0
    const will = state.details.will || 0
    return Number(state.details.amount) - Number(funeralExpenses) - Number(mehr) - Number(debt) - Number(will)
  })
  const currency = useSelector((state: RootState) => state.details.currency)

  useEffect(() => {
    fetchUlemas()
  }, [])

  const fetchUlemas = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/ulemas`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      setUlemas(response.data.ulemas)
    } catch (error) {
      console.error("Error fetching ulemas:", error)
      Alert.alert("Error", "Failed to load ulemas. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const startChat = async (ulemaId: string) => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${API_URL}/chats/start`,
        {
          ulema_id: ulemaId,
          inheritance_data: {
            heir_shares: heirSharesList,
            total_amount,
            amount,
            currency,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      )

      if (response.data.success) {
        router.push({
          pathname: "/chat",
          params: { chatId: response.data.chat_id },
        } as any)
      } else {
        Alert.alert("Error", response.data.message || "Failed to start chat")
      }
    } catch (error) {
      console.error("Error starting chat:", error)
      Alert.alert("Error", "Failed to start chat. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const renderUlemaItem = ({ item }: { item: Ulema }) => (
    <TouchableOpacity style={styles.ulemaCard} onPress={() => startChat(item.id)}>
      <View style={styles.ulemaInfo}>
        <Text style={styles.ulemaName}>{item.name}</Text>
        <Text style={styles.ulemaExpertise}>{item.expertise}</Text>
      </View>
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, item.isOnline ? styles.online : styles.offline]} />
        <Text style={styles.statusText}>{item.isOnline ? "Online" : "Offline"}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />

      <View style={styles.content}>
        <Text style={styles.title}>Verify with Ulema</Text>
        <Text style={styles.subtitle}>Select an Ulema to verify your inheritance calculation</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#006466" />
            <Text style={styles.loadingText}>Loading Ulemas...</Text>
          </View>
        ) : ulemas.length > 0 ? (
          <FlatList
            data={ulemas}
            renderItem={renderUlemaItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.ulemaList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Ulemas available at the moment</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={fetchUlemas}>
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
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#006466",
    textAlign: "center",
    marginBottom: 20,
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
  ulemaList: {
    paddingBottom: 20,
  },
  ulemaCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ulemaInfo: {
    flex: 1,
  },
  ulemaName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003049",
    marginBottom: 4,
  },
  ulemaExpertise: {
    fontSize: 14,
    color: "#666",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  online: {
    backgroundColor: "#4CAF50",
  },
  offline: {
    backgroundColor: "#9E9E9E",
  },
  statusText: {
    fontSize: 14,
    color: "#666",
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
