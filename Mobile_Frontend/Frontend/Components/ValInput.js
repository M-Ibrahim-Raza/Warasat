import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { setCurrency } from '../src/store/detailsSlice';

const ValInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  currencies,
  currency
}) => {
  const dispatch = useDispatch();

  const handleTextChange = (text) => {
    // Remove commas and non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    onChange({ target: { name, value: numericValue } });
  };

  const formattedValue = value === "" ? "" : Number(value).toLocaleString();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <View style={styles.inputContainer}>
        {currencies ? (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currency}
              style={styles.picker}
              onValueChange={(itemValue) => dispatch(setCurrency(itemValue))}
              dropdownIconColor="#555555"
            >
              {currencies.map((curr) => (
                <Picker.Item
                  key={curr}
                  label={curr}
                  value={curr}
                  style={styles.pickerItem}
                />
              ))}
            </Picker>
          </View>
        ) : (
          <Text style={styles.currencyText}>{currency}</Text>
        )}
        <TextInput
          style={styles.input}
          value={formattedValue}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor="rgba(85, 85, 85, 0.7)" // TCDG2/70
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '75%',
  },
  label: {
    fontWeight: '600',
    color: '#555555', // TCDG2
    marginBottom: 4,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    height: 40,
    justifyContent: 'center',
    width: 80,
  },
  picker: {
    width: 80,
    color: '#555555', // TCDG2
    fontWeight: '600',
  },
  pickerItem: {
    backgroundColor: '#FFFFFF', // TCLG1
    color: '#555555', // TCDG2
  },
  currencyText: {
    position: 'absolute',
    left: 14,
    color: '#555555', // TCDG2
    fontWeight: '600',
    zIndex: 1,
  },
  input: {
    width: '100%',
    paddingLeft: 56,
    paddingRight: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // TCLG1/60
    borderWidth: 2,
    borderColor: '#333333', // TCDG1
    borderRadius: 8,
    color: '#555555', // TCDG2
    fontWeight: '500',
  },
});

export default ValInput;