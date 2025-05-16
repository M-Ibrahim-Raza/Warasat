import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { Stack } from "expo-router"

export default function Hadiths() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Hadiths" }} />
      <View style={styles.content}>
        <Text style={styles.title}>Hadiths</Text>
        <Text style={styles.subtitle}>This screen will display Hadiths related to inheritance</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8f3dc",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003049",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
})
