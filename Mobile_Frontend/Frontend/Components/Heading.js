import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Heading = ({ children, style }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.headingBackground, style]}>
        <Text style={styles.headingText}>{children}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  headingBackground: {
    backgroundColor: '#FFFFFF', // TCLG1
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333', // TCDG1
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555555', // TCDG2
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Heading;