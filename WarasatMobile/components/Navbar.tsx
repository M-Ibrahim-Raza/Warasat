import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"

const Navbar = () => {
  return (
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
  )
}

const styles = StyleSheet.create({
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
})

export default Navbar
