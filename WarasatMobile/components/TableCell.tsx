import { Text, StyleSheet } from "react-native"
import type React from "react"

interface TableCellProps {
  children: React.ReactNode
  style?: object
}

const TableCell = ({ children, style }: TableCellProps) => {
  return <Text style={[styles.cell, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  cell: {
    fontSize: 14,
    color: "#333",
    padding: 10,
    textAlign: "center",
  },
})

export default TableCell
