function capitalizeWords(str) {
  return str
    .split(" ") // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(" "); // Join words back together
}

export {capitalizeWords}