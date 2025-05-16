import { View, TouchableOpacity, StyleSheet } from "react-native"
import { List, PieChart } from "lucide-react-native"

interface ViewToggleProps {
  viewToggle: number
  setViewToggle: (value: number) => void
}

const ViewToggle = ({ viewToggle, setViewToggle }: ViewToggleProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, viewToggle === 0 && styles.activeButton]}
        onPress={() => setViewToggle(0)}
      >
        <List size={20} color={viewToggle === 0 ? "#fff" : "#003049"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, viewToggle === 1 && styles.activeButton]}
        onPress={() => setViewToggle(1)}
      >
        <PieChart size={20} color={viewToggle === 1 ? "#fff" : "#003049"} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#006466",
  },
  button: {
    padding: 8,
    backgroundColor: "#fff",
  },
  activeButton: {
    backgroundColor: "#006466",
  },
})

export default ViewToggle
