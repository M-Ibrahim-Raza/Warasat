import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { Stack } from "expo-router"
import Navbar from "../components/Navbar"
import Heading from "../components/Heading"

export default function InheritanceCalculation() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />

      <View style={styles.content}>
        <Heading>Inheritance Calculation</Heading>
        <Text style={styles.subtitle}>This screen will display the inheritance calculation results</Text>
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
