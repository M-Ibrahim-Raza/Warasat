import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ id, name, value, checked, onChange, children }) => {
  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.containerChecked]}
      onPress={() => onChange({ target: { value } })}
      activeOpacity={0.8}
    >
      <View style={[styles.border, checked && styles.borderChecked]} />
      <View style={[styles.radio, checked && styles.radioChecked]} />
      <Text style={[styles.label, checked && styles.labelChecked]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 96,
    maxWidth: 208,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // TCLG1/60
    borderRadius: 8,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerChecked: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // TCLG1/60
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#333333', // TCDG1
    borderRadius: 8,
  },
  borderChecked: {
    borderWidth: 3,
    borderColor: '#333333', // TCDG1
  },
  radio: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -8,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 8,
    borderColor: '#d1d5db', // gray-300
    backgroundColor: 'white',
  },
  radioChecked: {
    borderColor: '#333333', // TCDG1
  },
  label: {
    marginRight: 24,
    fontWeight: '500',
    color: 'rgba(85, 85, 85, 0.9)', // TCDG2/90
  },
  labelChecked: {
    fontWeight: '600',
    color: '#555555', // TCDG2
  },
});

export default RadioButton;