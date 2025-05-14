import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Minus, Plus, Trash2 } from "lucide-react-native"

interface HeirInputProps {
  children: React.ReactNode
  val: number
  isSingle: boolean
  onIncrement: () => void
  onDecrement: () => void
  onDelete: () => void
}

const HeirInput = ({ children, val, isSingle, onIncrement, onDecrement, onDelete }: HeirInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
      <View style={styles.controls}>
        {!isSingle && (
          <>
            <TouchableOpacity style={styles.button} onPress={onDecrement}>
              <Minus size={18} color="#003049" />
            </TouchableOpacity>
            <Text style={styles.value}>{val}</Text>
            <TouchableOpacity style={styles.button} onPress={onIncrement}>
              <Plus size={18} color="#003049" />
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Trash2 size={18} color="#003049" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: "#003049",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e6f9e6",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003049",
    marginHorizontal: 5,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ffe6e6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
})

export default HeirInput
