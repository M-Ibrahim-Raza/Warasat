// src/utils/constants.js
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Device dimensions
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

// API endpoints
export const API_BASE_URL = IS_ANDROID 
  ? 'http://10.0.2.2:8080' 
  : 'http://localhost:8080';

export const API_ENDPOINTS = {
  CALCULATE_INHERITANCE: '/inheritance-calculator-2',
  GENERATE_EXCEL: '/inheritance-calculation-xlsx',
  GENERATE_PDF: '/inheritance-calculation-pdf',
};

// App constants
export const APP_NAME = 'Warasat';
export const APP_VERSION = '1.0.0';

// Currency options
export const CURRENCY_OPTIONS = ['Rs', '$', '€', '£'];

// Distribution methods
export const DISTRIBUTION_METHODS = {
  AMOUNT: 'amount',
  PERCENTAGE: 'percentage',
};

// Gender options
export const GENDER_OPTIONS = {
  MALE: 'male',
  FEMALE: 'female',
};