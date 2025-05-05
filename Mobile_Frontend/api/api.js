// src/api/api.js
import axios from 'axios';
import { Platform } from 'react-native';

// Base URL configuration
// For Android emulator, use 10.0.2.2 instead of localhost
// For iOS simulator, use localhost
const BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:8080' 
  : 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API methods
export const calculateInheritance = async (heirList, totalAmount) => {
  try {
    const response = await api.post('/inheritance-calculator-2', {
      heir_list: heirList,
      total_amount: totalAmount,
    });
    return response.data;
  } catch (error) {
    console.error('Calculate Inheritance Error:', error);
    throw error;
  }
};

export const generateExcel = async (data) => {
  try {
    const response = await api.post('/inheritance-calculation-xlsx', data, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Generate Excel Error:', error);
    throw error;
  }
};

export const generatePDF = async (data) => {
  try {
    const response = await api.post('/inheritance-calculation-pdf', data, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Generate PDF Error:', error);
    throw error;
  }
};

export default api;