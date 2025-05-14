import { Text, StyleSheet } from "react-native"
import type React from "react"

interface TableHeadingProps {
  children: React.ReactNode
  style?: object
}

const TableHeading = ({ children, style }: TableHeadingProps) => {
  return <Text style={[styles.heading, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#003049",
    padding: 10,
    textAlign: "center",
  },
})

export default TableHeading
