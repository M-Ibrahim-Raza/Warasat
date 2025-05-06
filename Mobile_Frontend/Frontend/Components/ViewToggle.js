import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { PieChart, List } from 'react-native-feather';

const ViewToggle = ({ viewToggle, setViewToggle }) => {
  const translateX = viewToggle ? 144 : 0;

  return (
    <View style={styles.container}>
      {/* Sliding Indicator */}
      <Animated.View 
        style={[
          styles.indicator, 
          { transform: [{ translateX }] }
        ]} 
      />

      {/* Table Button */}
      <TouchableOpacity
        onPress={() => setViewToggle(0)}
        style={[
          styles.button,
          !viewToggle && styles.activeButton
        ]}
      >
        <List width={18} height={18} stroke={!viewToggle ? "#FFFFFF" : "rgba(85, 85, 85, 0.7)"} />
        <Text style={[
          styles.buttonText,
          !viewToggle && styles.activeButtonText
        ]}>Table</Text>
      </TouchableOpacity>

      {/* Pie Chart Button */}
      <TouchableOpacity
        onPress={() => setViewToggle(1)}
        style={[
          styles.button,
          viewToggle && styles.activeButton
        ]}
      >
        <PieChart width={18} height={18} stroke={viewToggle ? "#FFFFFF" : "rgba(85, 85, 85, 0.7)"} />
        <Text style={[
          styles.buttonText,
          viewToggle && styles.activeButtonText
        ]}>Pie Chart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#F0F0F0', // TCLG3
    borderWidth: 2,
    borderColor: '#333333', // TCDG1
    borderRadius: 9999,
    flexDirection: 'row',
    width: 288,
    height: 40,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 144,
    borderRadius: 9999,
    backgroundColor: '#333333', // TCDG1
  },
  button: {
    width: 144,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  activeButton: {
    // No additional styles needed as the indicator handles the background
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(85, 85, 85, 0.7)', // TCDG2/70
  },
  activeButtonText: {
    color: '#FFFFFF', // TCLG1
    fontWeight: '600',
  },
});

export default ViewToggle;