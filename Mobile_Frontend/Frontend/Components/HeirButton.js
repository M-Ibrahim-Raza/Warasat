import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const HeirButton = ({ style, children, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5', // TCLG2
    borderWidth: 1.75,
    borderColor: '#555555', // TCDG2
    borderRadius: 8,
    shadowColor: '#555555', // TCDG2
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555', // TCDG2
    textAlign: 'center',
  },
});

export default HeirButton;