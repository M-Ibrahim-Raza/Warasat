// src/lib/utils.js

/**
 * Utility function to merge style objects in React Native
 * This replaces the cn function from the web version which used tailwind-merge
 * @param {...Object} styles - Style objects to merge
 * @returns {Object} - Merged style object
 */
export function mergeStyles(...styles) {
    return Object.assign({}, ...styles.filter(Boolean));
  }
  
  /**
   * Utility function to conditionally include styles
   * @param {Object} baseStyles - Base styles to always include
   * @param {Object} conditionalStyles - Object with keys as condition names and values as style objects
   * @param {Object} conditions - Object with keys matching conditionalStyles and boolean values
   * @returns {Object} - Merged style object
   */
  export function conditionalStyles(baseStyles, conditionalStyles, conditions) {
    const result = { ...baseStyles };
    
    Object.keys(conditionalStyles).forEach(key => {
      if (conditions[key]) {
        Object.assign(result, conditionalStyles[key]);
      }
    });
    
    return result;
  }
  
  /**
   * Utility function to create platform-specific styles
   * @param {Object} commonStyles - Styles common to all platforms
   * @param {Object} platformStyles - Object with keys as platform names and values as style objects
   * @returns {Object} - Merged style object for the current platform
   */
  export function platformStyles(commonStyles, platformStyles = {}) {
    const { Platform } = require('react-native');
    const platform = Platform.OS;
    
    return {
      ...commonStyles,
      ...(platformStyles[platform] || {})
    };
  }