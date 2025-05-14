import { View, Text, TextInput, StyleSheet } from "react-native"

interface ValInputProps {
  id: string
  value: string | number
  placeholder: string
  label: string
  onChange: (value: { target: { value: string } }) => void
  currency?: string
  style?: object
}

const ValInput = ({ id, value, placeholder, label, onChange, currency = "Rs", style }: ValInputProps) => {
  const handleChange = (text: string) => {
    onChange({ target: { value: text } })
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.currency}>{currency}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value.toString()}
          onChangeText={handleChange}
          keyboardType="numeric"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: "#003049",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "white",
  },
  currency: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#003049",
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
})

export default ValInput
