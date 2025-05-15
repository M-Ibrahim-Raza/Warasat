import { View, Text, StyleSheet } from "react-native"
import type React from "react"

interface TableHeadingProps {
  children: React.ReactNode
  style?: object
  width?: number | string
}

const TableHeading = ({ children, style, width = 100 }: TableHeadingProps) => {
  return (
    <View style={[styles.headingContainer, { width }, style]}>
      <Text style={styles.headingText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headingContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#006466",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#003049",
    textAlign: "center",
  },
})

export default TableHeading