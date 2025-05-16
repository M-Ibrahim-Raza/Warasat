import type React from "react"
import { Text, StyleSheet } from "react-native"

interface HeadingProps {
  children: React.ReactNode
  style?: object
}

const Heading = ({ children, style }: HeadingProps) => {
  return <Text style={[styles.heading, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003049",
    textAlign: "center",
    marginVertical: 10,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
})

export default Heading
