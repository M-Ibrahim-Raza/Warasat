import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import { Link } from "expo-router"
import { MessageCircle } from "lucide-react-native"
import CustomButton from "../components/CustomButton"

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.headerText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.globeIcon}>
          <Image source={require("../assets/globe.png")} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>

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
              <CustomButton style={styles.mainButton}>Ayahs</CustomButton>
            </Link>


            <Link href={"/hadiths" as any} asChild>
              <CustomButton style={styles.smallButton}>Hadiths</CustomButton>
            </Link>

            <Link href={"/info" as any} asChild>
              <CustomButton style={styles.smallButton}>Info</CustomButton>
            </Link>
          </View>
        </View>

        {/* Chat Bot Button */}
        <TouchableOpacity style={styles.chatBotButton}>
          <MessageCircle color="white" size={24} />
          <Text style={styles.chatBotText}>Chat Bot</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8f3dc", // Light mint green background
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#003049", // Dark blue
    padding: 16,
    paddingTop: 20,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    marginRight: 20,
  },
  globeIcon: {
    position: "absolute",
    right: 16,
    top: 20,
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
  },
  smallButton: {
    width: "30%",
  },
  chatBotButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#003049", // Dark blue
    borderRadius: 30,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chatBotText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
})
