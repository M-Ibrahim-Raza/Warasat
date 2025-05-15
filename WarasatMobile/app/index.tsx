"use client"
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native"
import { Link, router } from "expo-router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CustomButton from "../components/CustomButton"
import Navbar from "../components/Navbar"
import ChatBot from "../components/ChatBot"
import type { RootState } from "../store/store"

export default function HomeScreen() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Use a timeout to ensure navigation happens after component is mounted
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.replace("/login")
      }
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [isAuthenticated])

  // Show loading or nothing while checking authentication
  if (isLoading || !isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/WarasatLogo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Warasat</Text>
          {user && <Text style={styles.welcomeText}>Welcome, {user.name}</Text>}
        </View>

        <View style={styles.buttonsContainer}>
          <Link href={"/inheritance-calculator" as any} asChild>
            <CustomButton style={styles.mainButton}>Islamic Inheritance Calculator</CustomButton>
          </Link>

          <View style={styles.smallButtonsRow}>
            <Link href={"/ayahs" as any} asChild>
              <CustomButton style={styles.smallButton}>Ayahs</CustomButton>
            </Link>

            <Link href={"/hadiths" as any} asChild>
              <CustomButton style={styles.smallButton}>Hadiths</CustomButton>
            </Link>

            <Link href={"/info" as any} asChild>
              <CustomButton style={styles.smallButton}>Info</CustomButton>
            </Link>
          </View>
        </View>

        {/* Chat Bot Component */}
        <ChatBot />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8f3dc", // Light mint green background
  },
  content: {
    flex: 1,
    padding: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#003049", // Dark blue
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: "#006466",
    marginTop: 5,
  },
  buttonsContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  mainButton: {
    width: "90%",
    padding: 20,
    marginBottom: 20,
  },
  smallButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    gap: 10,
  },
  smallButton: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#003049",
  },
})
