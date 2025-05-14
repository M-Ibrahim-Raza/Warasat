import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native"
import { Link } from "expo-router"
import CustomButton from "../components/CustomButton"
import Navbar from "../components/Navbar"
import ChatBot from "../components/ChatBot"

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/WarasatLogo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Warasat</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Link href={"/inheritance-calculator" as any} asChild>
            <CustomButton style={styles.mainButton}>Islamic Inheritance Calculator</CustomButton>
          </Link>

          <View style={styles.smallButtonsRow}>
            <Link href={"/ayahs" as any} asChild>
              <CustomButton style={styles.smallButton}>Ayahs</CustomButton>
            </Link>

            <Link href={"/hadiths" as any} asChild>
              <CustomButton style={styles.smallButton}>Hadiths</CustomButton>
            </Link>

            <Link href={"/info" as any} asChild>
              <CustomButton style={styles.smallButton}>Info</CustomButton>
            </Link>
          </View>
        </View>

        {/* Chat Bot Component */}
        <ChatBot />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8f3dc", // Light mint green background
  },
  content: {
    flex: 1,
    padding: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#003049", // Dark blue
    marginTop: 10,
  },
  buttonsContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  mainButton: {
    width: "90%",
    padding: 20,
    marginBottom: 20,
  },
  smallButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    gap: 10,
  },
  smallButton: {
    flex: 1,
  },
})
