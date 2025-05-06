import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsDisplay = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        {children[0]}
      </View>
      <View style={styles.rightSection}>
        {children[1]}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // TCLG1
    borderWidth: 1,
    borderColor: '#333333', // TCDG1
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
  },
  leftSection: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailsDisplay;