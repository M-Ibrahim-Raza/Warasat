import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Switch } from '../src/components_ui/switch';

const OptionToggle = ({ checked, onCheckedChange, children }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onCheckedChange}
      activeOpacity={0.8}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>Add</Text>
        <Text style={styles.subText}>{children}</Text>
      </View>
      <Switch 
        value={checked} 
        onValueChange={onCheckedChange}
        style={styles.switch}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#333333', // TCDG1
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFFFFF', // TCLG1
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    color: '#555555', // TCDG2
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  subText: {
    color: '#555555', // TCDG2
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    marginTop: -4,
  },
  switch: {
    marginTop: 4,
  },
});

export default OptionToggle;