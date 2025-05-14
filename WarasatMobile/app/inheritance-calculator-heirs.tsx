import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { Stack } from "expo-router"
import Navbar from "../components/Navbar"
import Heading from "../components/Heading"

export default function InheritanceCalculatorHeirs() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />

      <View style={styles.content}>
        <Heading>Add Heirs</Heading>
        <Text style={styles.subtitle}>This screen will allow users to add heirs for the inheritance calculation</Text>
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
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
})
