import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity 
        style={[styles.navItem, styles.leftItem]} 
        onPress={() => navigation.navigate('About')}
      >
        <Text style={styles.navText}>About</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('Contact')}
      >
        <Text style={styles.navText}>Contact Us</Text>
      </TouchableOpacity>
      
      <View style={styles.rightContainer}>
        <TouchableOpacity 
          style={[styles.navItem, styles.iconItem]} 
          onPress={() => navigation.navigate('Info')}
        >
          <Image 
            source={require('../../assets/images/globe.png')} 
            style={styles.icon} 
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#555555', // TCDG2
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    height: '100%',
  },
  leftItem: {
    marginLeft: 16,
  },
  navText: {
    color: '#FFFFFF', // TCLG1
    fontWeight: '600',
    fontSize: 18,
  },
  rightContainer: {
    marginLeft: 'auto',
    height: '100%',
  },
  iconItem: {
    width: '100%',
    height: '100%',
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default NavBar;