import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("Home");
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim }
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={1}
        onPress={handlePress}
      >
        <View style={styles.center}>
          <View style={styles.logo}>
            <Image
              style={styles.logoImage}
              source={require("../assets/images/Warasat Logo.png")}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Warasat</Text>
          <Text style={styles.subtitle}>Islamic Inheritance Calculator</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // TCLG2 color
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    transform: [{ scale: 1.1 }],
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#333333", // TCDG1 color
    textAlign: "center",
    paddingTop: 16,
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "300",
    color: "#333333", // TCDG1 color
    textAlign: "center",
    paddingTop: 8,
    fontFamily: "Poppins-Light",
  },
});

export default Splash;