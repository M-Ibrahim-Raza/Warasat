import { TouchableOpacity, Text, StyleSheet } from "react-native"
import type React from "react"

interface HeirButtonProps {
  children: React.ReactNode
  style?: object
  onClick: () => void
}

const HeirButton = ({ children, style, onClick }: HeirButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onClick} activeOpacity={0.7}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e6f9e6",
    borderWidth: 1,
    borderColor: "#006466",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#003049",
    fontSize: 16,
    textAlign: "center",
  },
})

export default HeirButton
