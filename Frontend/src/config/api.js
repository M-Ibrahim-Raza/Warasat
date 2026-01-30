/**
 * API Configuration
 * 
 * Centralized configuration for all backend API endpoints.
 * Update the BASE_URL when deploying to production.
 */

// Base URL for the backend API
// For development: http://localhost:8080
// For production: Update to your deployed backend URL
export const API_BASE_URL = "http://localhost:8080";

// WebSocket Base URL
export const WS_BASE_URL = API_BASE_URL.replace("http", "ws");

// API Endpoints
export const API_ENDPOINTS = {
  // Inheritance Calculator
  INHERITANCE_CALCULATOR: `${API_BASE_URL}/inheritance-calculator-2`,
  
  // Report Generation
  EXCEL_REPORT: `${API_BASE_URL}/inheritance-calculation-xlsx`,
  PDF_REPORT: `${API_BASE_URL}/inheritance-calculation-pdf`,
  
  // Chatbot
  CHATBOT: `${API_BASE_URL}/get_answer`,
  
  // Health Check
  HEALTH: `${API_BASE_URL}/health`,
  
  // Authentication
  AUTH_SIGNUP: `${API_BASE_URL}/auth/signup`,
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_VERIFY: `${API_BASE_URL}/auth/verify`,
  
  // Ulema
  ULEMAS: `${API_BASE_URL}/ulemas`,
  
  // Chat System
  CHATS_START: `${API_BASE_URL}/chats/start`,
  CHATS_GET: (chatId) => `${API_BASE_URL}/chats/${chatId}`,
  CHATS_MESSAGES: (chatId) => `${API_BASE_URL}/chats/${chatId}/messages`,
  ULEMA_CHATS: `${API_BASE_URL}/ulema/chats`,
  USER_CHATS: `${API_BASE_URL}/user/chats`,
  
  // WebSocket
  WS_CHAT: (chatId, token) => `${WS_BASE_URL}/ws/chat/${chatId}?token=${token}`,
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return API_ENDPOINTS[endpoint] || `${API_BASE_URL}${endpoint}`;
};

// Helper function to make authenticated requests
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("warasat_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  
  const response = await fetch(url, { ...options, headers });
  return response;
};

export default API_ENDPOINTS;

