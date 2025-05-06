import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../Frontend/Components/Button";

const Home = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/WarasatLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Warasat</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <View style={styles.mainButtonContainer}>
          <Button
            style={styles.mainButton}
            onPress={() => navigation.navigate("InheritanceCalculator")}
          >
            Islamic Inheritance Calculator
          </Button>
        </View>
        
        <View style={styles.secondaryButtonsContainer}>
          <Button style={styles.secondaryButton}>Ayahs</Button>
          <Button style={styles.secondaryButton}>Hadiths</Button>
          <Button style={styles.secondaryButton}>Info</Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // TCLG2
  },
  center: {
    paddingTop: 16,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    paddingBottom: 24,
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: '#555555', // TCDG2
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonsContainer: {
    marginBottom: 48,
    marginHorizontal: 16,
  },
  mainButtonContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  mainButton: {
    width: 300,
    paddingVertical: 32,
  },
  secondaryButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  secondaryButton: {
    width: 100,
  },
});

export default Home;