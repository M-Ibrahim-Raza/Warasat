/**
 * Authentication Context
 * 
 * Provides authentication state management with localStorage persistence.
 * Handles login, logout, and protected route functionality.
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, authFetch } from "../config/api";

// Create Auth Context
const AuthContext = createContext(null);

// Storage keys
const TOKEN_KEY = "warasat_token";
const USER_KEY = "warasat_user";

/**
 * Auth Provider Component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Invalid stored data, clear it
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login function
   */
  const login = async (email, password, userType = "user") => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, user_type: userType }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.detail || data.message || "Login failed");
      }

      // Store in state and localStorage
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      setLoading(false);
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  /**
   * Signup function (for regular users only)
   */
  const signup = async (name, email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH_SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.detail || data.message || "Signup failed");
      }

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  /**
   * Verify current token is valid
   */
  const verifyToken = async () => {
    if (!token) return false;

    try {
      const response = await authFetch(API_ENDPOINTS.AUTH_VERIFY);
      return response.ok;
    } catch {
      return false;
    }
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  /**
   * Check if user is an Ulema
   */
  const isUlema = () => {
    return user?.user_type === "ulema";
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    signup,
    logout,
    verifyToken,
    isAuthenticated,
    isUlema,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Protected Route Component
 * Redirects to login if not authenticated
 */
export const ProtectedRoute = ({ children, requireUlema = false }) => {
  const { isAuthenticated, isUlema, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated()) {
        navigate("/login");
      } else if (requireUlema && !isUlema()) {
        navigate("/"); // Redirect non-ulema from ulema-only pages
      }
    }
  }, [loading, isAuthenticated, isUlema, requireUlema, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return null;
  }

  if (requireUlema && !isUlema()) {
    return null;
  }

  return children;
};

export default AuthContext;

