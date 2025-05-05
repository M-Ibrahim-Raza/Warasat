import React from "react";
import { View, StyleSheet } from "react-native";
import PieChartComponent from "../../Frontend/Components/PieChartComponent";

const Test = () => {
  // Sample data for testing
  const testData = [
    { relation: "son", val: 2, amount: 10000, category: ["asabah", "Residuary"] },
    { relation: "daughter", val: 1, amount: 5000, category: ["asabah", "Residuary"] },
    { relation: "wife", val: 1, amount: 3000, category: ["fard", "Sharer"] },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChartComponent 
          heirSharesList={testData}
          total_amount={18000}
          currency="$"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 40,
  },
  chartContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingVertical: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});

export default Test;