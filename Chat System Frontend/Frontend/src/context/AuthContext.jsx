"use client"

import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"

const API_URL = "http://localhost:3000" // Update with your backend URL

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        console.log("Loaded user from localStorage:", parsedUser)
        setCurrentUser(parsedUser)
      } catch (e) {
        console.error("Error parsing user data from localStorage:", e)
        // Clear invalid data
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    } else {
      console.log("No user data found in localStorage")
    }

    setLoading(false)
  }, [])

  // Register a new user
  const register = async (name, email, password) => {
    try {
      setError(null)
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
      })

      if (response.data.success) {
        return { success: true }
      } else {
        setError(response.data.message || "Registration failed")
        return { success: false, error: response.data.message || "Registration failed" }
      }
    } catch (err) {
      console.error("Registration error:", err)
      setError(err.response?.data?.message || "Registration failed")
      return { success: false, error: err.response?.data?.message || "Registration failed" }
    }
  }

  // Login user
  const login = async (email, password, userType = "user") => {
    try {
      setError(null)
      console.log(`Attempting login for ${email} as ${userType}`)

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
        user_type: userType,
      })

      if (response.data.success) {
        const { user, token } = response.data
        console.log("Login successful:", user)
        console.log("Token received:", token ? "Yes (token hidden for security)" : "No")

        // Store token and user data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))

        // Set current user
        setCurrentUser(user)

        return { success: true }
      } else {
        setError(response.data.message || "Login failed")
        return { success: false, error: response.data.message || "Login failed" }
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(err.response?.data?.message || "Login failed")
      return { success: false, error: err.response?.data?.message || "Login failed" }
    }
  }

  // Logout user
  const logout = () => {
    console.log("Logging out user")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setCurrentUser(null)
  }

  // Get authentication header
  const getAuthHeader = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.warn("No authentication token found")
      return {}
    }

    console.log("Auth header created with token:", token ? "Yes (token hidden for security)" : "No")
    return { Authorization: `Bearer ${token}` }
  }

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    getAuthHeader,
    isAuthenticated: !!currentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
