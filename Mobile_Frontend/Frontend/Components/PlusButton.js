import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const PlusButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Svg width={24} height={24} viewBox="0 0 24 24" style={styles.icon}>
        <Circle cx={12} cy={12} r={10} fill="white" stroke="#555555" strokeWidth={1.75} />
        <Path d="M8 12h8" stroke="#555555" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12 8v8" stroke="#555555" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    opacity: 0.85,
  },
});

export default PlusButton;