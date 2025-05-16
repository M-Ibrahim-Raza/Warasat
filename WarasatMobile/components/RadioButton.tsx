import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface RadioButtonProps {
  id: string
  value: string
  checked: boolean
  onChange: (value: { target: { value: string } }) => void
  children: React.ReactNode
  style?: object
}

const RadioButton = ({ id, value, checked, onChange, children, style }: RadioButtonProps) => {
  const handlePress = () => {
    onChange({ target: { value } })
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.radioContainer}>
        <View style={styles.radio}>{checked && <View style={styles.selected} />}</View>
        <Text style={styles.label}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#006466",
    borderRadius: 8,
    backgroundColor: "white",
    minWidth: 120,
    alignItems: "center",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#006466",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  selected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#006466",
  },
  label: {
    fontSize: 16,
    color: "#003049",
  },
})

export default RadioButton
