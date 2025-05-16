import { View, Text, StyleSheet } from "react-native"
import React from "react"

interface DetailsDisplayProps {
  children: React.ReactNode
  style?: object
}

const DetailsDisplay = ({ children, style }: DetailsDisplayProps) => {
  // Assuming children are two text elements
  const childrenArray = React.Children.toArray(children)

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{childrenArray[0]}</Text>
      <Text style={styles.value}>{childrenArray[1]}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    color: "#003049",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003049",
  },
})

export default DetailsDisplay
