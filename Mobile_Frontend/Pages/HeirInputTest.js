import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HeirInput from '../../Frontend/Components/HeirInput';

const HeirInputTest = () => {
  const [val, setVal] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.testContainer}>
        <HeirInput 
          onIncrement={() => setVal(val => val + 1)} 
          val={val}
          onDecrement={() => { val > 1 && setVal(val => val - 1) }}
          onDelete={() => console.log('Delete pressed')}
        >
          Son
        </HeirInput>
        
        <HeirInput 
          val={12}
          onIncrement={() => {}}
          onDecrement={() => {}}
          onDelete={() => console.log('Delete pressed')}
        >
          Son
        </HeirInput>
        
        <HeirInput 
          val={12}
          onIncrement={() => {}}
          onDecrement={() => {}}
          onDelete={() => console.log('Delete pressed')}
        >
          Daughter
        </HeirInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 40,
  },
  testContainer: {
    flexDirection: 'column',
    gap: 16,
    padding: 8,
    paddingVertical: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});

export default HeirInputTest;