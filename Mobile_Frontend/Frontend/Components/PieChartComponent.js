import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { capitalizeWords, calculatePercentage, formatNumber } from '../../lib/utils';

const PieChartComponent = ({ heirSharesList, total_amount, currency }) => {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width - 40,
    height: (Dimensions.get('window').width - 40) * 0.6,
  });

  // Update dimensions on orientation change
  useEffect(() => {
    const updateLayout = () => {
      setDimensions({
        width: Dimensions.get('window').width - 40,
        height: (Dimensions.get('window').width - 40) * 0.6,
      });
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      // Clean up event listener
      const dimensionsHandler = Dimensions.addEventListener('change', () => {});
      dimensionsHandler.remove();
    };
  }, []);

  // Prepare data for pie chart
  const chartData = heirSharesList.map((heir, index) => {
    const display_count = heir.val > 1 ? ` × ${heir.val}` : "";
    const percentage = calculatePercentage(heir.val * heir.amount, total_amount);
    
    return {
      name: capitalizeWords(heir.relation) + display_count,
      population: percentage,
      color: getChartColor(index),
      legendFontColor: '#333333',
      legendFontSize: 12,
    };
  });

  // Get chart colors
  function getChartColor(index) {
    const colors = [
      '#F97316', // chart1
      '#14B8A6', // chart2
      '#0F3443', // chart3
      '#EAB308', // chart4
      '#F97316', // chart5
      '#3B82F6',
      '#EC4899',
      '#8B5CF6',
      '#10B981',
      '#F59E0B',
    ];
    return colors[index % colors.length];
  }

  return (
    <View style={styles.container}>
      <PieChart
        data={chartData}
        width={dimensions.width}
        height={dimensions.height}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        hasLegend={true}
        center={[dimensions.width / 4, 0]}
        avoidFalseZero
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default PieChartComponent;