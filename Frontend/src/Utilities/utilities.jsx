function capitalizeWords(str) {
  return str
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(" "); // Join words back together
}

function formatNumber(num) {
  if (num > 1000) {
    return Math.round(num); // Round to nearest integer
  } else if (num > 100) {
    return num.toFixed(1); // Show 1 decimal place
  } else {
    return num.toFixed(2); // Show 2 decimal places
  }
}

function calculatePercentage(value, total) {
  if (total === 0) return 0; // Avoid division by zero
  let percentage = (value / total) * 100;
  return percentage.toFixed(1); // Format with 1 decimal place
}

export { formatNumber, capitalizeWords, calculatePercentage };
