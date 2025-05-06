import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Test2 = () => {
  const [selectedOption, setSelectedOption] = useState("radio_1");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.radioOption}>
          <TouchableOpacity
            style={[
              styles.radioLabel,
              selectedOption === "radio_1" && styles.radioLabelSelected,
            ]}
            onPress={() => handleOptionSelect("radio_1")}
          >
            <Text style={styles.radioCategory}>Small</Text>
            <Text style={styles.radioTitle}>Micro VPS</Text>
            <View style={styles.radioDetails}>
              <Text style={styles.radioDetailItem}>45 GBs</Text>
              <Text style={styles.radioDetailItem}>3.0 GHz</Text>
            </View>
          </TouchableOpacity>
          
          <View
            style={[
              styles.radioIndicator,
              selectedOption === "radio_1" && styles.radioIndicatorSelected,
            ]}
          />
        </View>
        
        <View style={styles.radioOption}>
          <TouchableOpacity
            style={[
              styles.radioLabel,
              selectedOption === "radio_2" && styles.radioLabelSelected,
            ]}
            onPress={() => handleOptionSelect("radio_2")}
          >
            <Text style={styles.radioCategory}>Medium</Text>
            <Text style={styles.radioTitle}>Smart VPS</Text>
            <View style={styles.radioDetails}>
              <Text style={styles.radioDetailItem}>45 GBs</Text>
              <Text style={styles.radioDetailItem}>3.0 GHz</Text>
            </View>
          </TouchableOpacity>
          
          <View
            style={[
              styles.radioIndicator,
              selectedOption === "radio_2" && styles.radioIndicatorSelected,
            ]}
          />
        </View>
        
        <View style={styles.radioOption}>
          <TouchableOpacity
            style={[
              styles.radioLabel,
              selectedOption === "radio_3" && styles.radioLabelSelected,
            ]}
            onPress={() => handleOptionSelect("radio_3")}
          >
            <Text style={styles.radioCategory}>Big</Text>
            <Text style={styles.radioTitle}>Super VPS</Text>
            <View style={styles.radioDetails}>
              <Text style={styles.radioDetailItem}>45 GBs</Text>
              <Text style={styles.radioDetailItem}>3.0 GHz</Text>
            </View>
          </TouchableOpacity>
          
          <View
            style={[
              styles.radioIndicator,
              selectedOption === "radio_3" && styles.radioIndicatorSelected,
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: 300,
    gap: 8,
  },
  radioOption: {
    position: 'relative',
  },
  radioLabel: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
  },
  radioLabelSelected: {
    borderWidth: 4,
    borderColor: '#4338ca',
  },
  radioIndicator: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 8,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
  },
  radioIndicatorSelected: {
    borderColor: '#4338ca',
  },
  radioCategory: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  radioTitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  radioDetails: {
    marginTop: 8,
  },
  radioDetailItem: {
    fontSize: 14,
  },
});

export default Test2;