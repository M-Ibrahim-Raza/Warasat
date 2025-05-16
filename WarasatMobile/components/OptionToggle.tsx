"use client"

import type React from "react"
import { View, Text, Switch, StyleSheet } from "react-native"

interface OptionToggleProps {
  children: React.ReactNode
  checked: boolean
  onCheckedChange: () => void
  style?: object
}

const OptionToggle = ({ children, checked, onCheckedChange, style }: OptionToggleProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{children}</Text>
      <Switch
        trackColor={{ false: "#d9d9d9", true: "#006466" }}
        thumbColor={checked ? "#ffffff" : "#f4f3f4"}
        ios_backgroundColor="#d9d9d9"
        onValueChange={onCheckedChange}
        value={checked}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minWidth: 120,
  },
  label: {
    fontSize: 14,
    color: "#003049",
    marginBottom: 5,
    textAlign: "center",
  },
})

export default OptionToggle
