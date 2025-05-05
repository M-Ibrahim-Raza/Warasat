// utils/utilities.js

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalizeWords(str) {
    if (!str) return '';
    
    return str
      .split(" ") // Split the string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
      .join(" "); // Join words back together
  }
  
  /**
   * Formats a number based on its magnitude
   * @param {number} num - The number to format
   * @returns {string} - The formatted number
   */
  function formatNumber(num) {
    if (!num && num !== 0) return '0';
    
    if (num > 1000) {
      return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Round to nearest integer and add commas
    } else if (num > 100) {
      return parseFloat(num.toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Show 1 decimal place and add commas
    } else {
      return parseFloat(num.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Show 2 decimal places and add commas
    }
  }
  
  /**
   * Calculates the percentage of a value relative to a total
   * @param {number} value - The value
   * @param {number} total - The total
   * @returns {string} - The percentage with 1 decimal place
   */
  function calculatePercentage(value, total) {
    if (!value || !total || total === 0) return '0.0'; // Avoid division by zero
    
    let percentage = (value / total) * 100;
    return percentage.toFixed(1); // Format with 1 decimal place
  }
  
  /**
   * Formats currency values
   * @param {number} amount - The amount to format
   * @param {string} currency - The currency symbol
   * @returns {string} - The formatted currency string
   */
  function formatCurrency(amount, currency = 'Rs') {
    if (!amount && amount !== 0) return `${currency} 0`;
    
    return `${currency} ${formatNumber(amount)}`;
  }
  
  /**
   * Validates numeric input
   * @param {string} value - The input value
   * @returns {boolean} - Whether the input is valid
   */
  function isValidNumber(value) {
    if (!value) return true; // Empty input is valid
    
    // Allow numbers, commas, and decimal points
    return /^[0-9,]*\.?[0-9]*$/.test(value);
  }
  
  /**
   * Parses a formatted number string back to a number
   * @param {string} value - The formatted number string
   * @returns {number} - The parsed number
   */
  function parseFormattedNumber(value) {
    if (!value) return 0;
    
    // Remove commas and convert to number
    return parseFloat(value.replace(/,/g, ''));
  }
  
  export { 
    formatNumber, 
    capitalizeWords, 
    calculatePercentage,
    formatCurrency,
    isValidNumber,
    parseFormattedNumber
  };