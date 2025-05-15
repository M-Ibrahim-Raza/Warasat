"use client"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Stack, router } from "expo-router"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setUser } from "../../store/authSlice"
import { API_URL } from "../../config/api"
import type { RootState } from "../../store/store"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState("user") // "user" or "ulema"
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  // If already authenticated, redirect to home
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace("/")
      }
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [isAuthenticated])

  // Show loading while checking authentication
  if (isLoading && isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#006466" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password")
      return
    }

    try {
      setLoading(true)
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
        user_type: userType,
      })

      if (response.data.success) {
        dispatch(
          setUser({
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name,
            userType: response.data.user.user_type,
            token: response.data.token,
          }),
        )
        router.replace("/")
      } else {
        Alert.alert("Error", response.data.message || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      Alert.alert("Error", "Login failed. Please check your credentials and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        <Image source={require("../../assets/WarasatLogo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Warasat</Text>
        <Text style={styles.subtitle}>Islamic Inheritance Calculator</Text>

        <View style={styles.form}>
          <View style={styles.userTypeSelector}>
            <TouchableOpacity
              style={[styles.userTypeButton, userType === "user" && styles.activeUserType]}
              onPress={() => setUserType("user")}
            >
              <Text style={[styles.userTypeText, userType === "user" && styles.activeUserTypeText]}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.userTypeButton, userType === "ulema" && styles.activeUserType]}
              onPress={() => setUserType("ulema")}
            >
              <Text style={[styles.userTypeText, userType === "ulema" && styles.activeUserTypeText]}>Ulema</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Login</Text>}
          </TouchableOpacity>

          {userType === "user" && (
            <TouchableOpacity style={styles.signupLink} onPress={() => router.push("/signup")}>
              <Text style={styles.signupText}>
                Don't have an account? <Text style={styles.signupLinkText}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#003049",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#006466",
    marginBottom: 40,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  userTypeSelector: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#006466",
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  activeUserType: {
    backgroundColor: "#006466",
  },
  userTypeText: {
    fontSize: 16,
    color: "#006466",
    fontWeight: "500",
  },
  activeUserTypeText: {
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#003049",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#006466",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupLink: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    fontSize: 16,
    color: "#003049",
  },
  signupLinkText: {
    color: "#006466",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#003049",
    marginTop: 10,
  },
})
