import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TableHeading = ({ children }) => {
  return (
    <View style={styles.heading}>
      <Text style={styles.headingText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // TCT1
    alignItems: 'center',
  },
  headingText: {
    fontWeight: '600',
    color: '#333333', // TCDG1
    fontSize: 14,
  },
});

export default TableHeading;