import { View, Text, StyleSheet } from "react-native"
import type React from "react"

interface TableCellProps {
  children: React.ReactNode
  style?: object
  width?: number | string
}

const TableCell = ({ children, style, width = 100 }: TableCellProps) => {
  return (
    <View style={[styles.cellContainer, { width }, style]}>
      <Text style={styles.cellText} numberOfLines={2} ellipsizeMode="tail">
        {children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cellContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  cellText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
})

export default TableCell