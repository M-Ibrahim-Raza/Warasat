// components_ui/switch.js
import React from 'react';
import { Switch as RNSwitch, StyleSheet, View } from 'react-native';

export const Switch = ({ 
  checked, 
  onCheckedChange, 
  size = 'default',
  disabled = false,
  style
}) => {
  const handleValueChange = (value) => {
    if (onCheckedChange) {
      onCheckedChange(value);
    }
  };
  
  return (
    <View style={[
      styles.container,
      size === 'large' ? styles.containerLarge : styles.containerDefault,
      style
    ]}>
      <RNSwitch
        value={checked}
        onValueChange={handleValueChange}
        disabled={disabled}
        trackColor={{ 
          false: '#D1D5DB', 
          true: '#555555' 
        }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#D1D5DB"
        style={size === 'large' ? styles.switchLarge : styles.switchDefault}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDefault: {
    height: 20,
    width: 36,
  },
  containerLarge: {
    height: 26,
    width: 46,
  },
  switchDefault: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  switchLarge: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
  },
});