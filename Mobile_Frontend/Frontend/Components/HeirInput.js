import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MinusButton from './MinusButton';
import PlusButton from './PlusButton';
import { Trash2 } from 'react-native-feather';

const HeirInput = ({
  onIncrement,
  onDecrement,
  val,
  children,
  isSingle,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      {isSingle ? (
        <View style={styles.singleContainer}>
          <Text style={styles.text}>{children}</Text>
        </View>
      ) : (
        <>
          <View style={styles.labelContainer}>
            <Text style={styles.text}>{children}</Text>
          </View>
          <View style={styles.controlsContainer}>
            <MinusButton onPress={onDecrement} />
            <View style={styles.valueContainer}>
              <Text style={styles.text}>{val}</Text>
            </View>
            <PlusButton onPress={onIncrement} />
          </View>
        </>
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Trash2 stroke="#555555" width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 350,
    backgroundColor: '#FFFFFF', // TCLG1
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 'auto',
    borderWidth: 0.5,
    borderColor: '#555555', // TCDG2
    position: 'relative',
  },
  singleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flex: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueContainer: {
    flex: 1,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    color: '#555555', // TCDG2
  },
  deleteButton: {
    position: 'absolute',
    right: -28,
    top: '50%',
    marginTop: -12,
  },
});

export default HeirInput;