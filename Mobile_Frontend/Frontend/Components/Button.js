import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ style, children, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#333333", // TCDG1
    borderWidth: 2,
    borderColor: "#555555", // TCDG2
    borderRadius: 8,
    shadowColor: "#555555", // TCDG2
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Button;