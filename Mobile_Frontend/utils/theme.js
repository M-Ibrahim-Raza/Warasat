// src/utils/theme.js
import { fontFamily } from './fonts';

export const colors = {
  // Primary colors
  primary: '#4F46E5', // Indigo-600
  primaryDark: '#4338CA', // Indigo-700
  primaryLight: '#818CF8', // Indigo-400
  
  // Text colors
  textDark: '#333333', // TCDG1
  textMedium: '#555555', // TCDG2
  textLight: '#777777', // TCDG3
  
  // Background colors
  bgLight: '#F5F5F5', // TCLG2
  bgMedium: '#E5E7EB', // TCT1
  bgDark: '#D1D5DB', // TCT2
  
  // Accent colors
  accent: '#10B981', // Emerald-500
  error: '#EF4444', // Red-500
  warning: '#F59E0B', // Amber-500
  info: '#3B82F6', // Blue-500
  
  // Utility colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  heading1: {
    fontFamily: fontFamily.montserratBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textDark,
  },
  heading2: {
    fontFamily: fontFamily.montserratBold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.textDark,
  },
  heading3: {
    fontFamily: fontFamily.montserratBold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textDark,
  },
  body: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textMedium,
  },
  bodySmall: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMedium,
  },
  button: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: 16,
    lineHeight: 24,
    color: colors.white,
  },
};

export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

const theme = {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
};

export default theme;