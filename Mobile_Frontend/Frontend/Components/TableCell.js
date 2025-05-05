import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { capitalizeWords } from '../src/lib/utils';

const TableCell = ({ children }) => {
  const displayText = typeof children === 'string' ? capitalizeWords(children) : children;
  
  return (
    <View style={styles.cell}>
      <Text style={styles.cellText}>{displayText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // TCT1
    alignItems: 'center',
  },
  cellText: {
    color: '#333333', // TCDG1
    fontSize: 14,
  },
});

export default TableCell;