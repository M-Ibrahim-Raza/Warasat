import { View, Text, StyleSheet, Dimensions } from "react-native"
import { PieChart } from "react-native-chart-kit"
import { formatNumber, calculatePercentage } from "../utils/utilities"
import { capitalizeWords } from "../utils/utilities"
import React from "react";

interface HeirShare {
  relation: string
  val: number
  limit: number
  category: [string, string]
  amount: number
}

interface PieChartComponentProps {
  heirSharesList: HeirShare[]
  total_amount: number
  currency: string
}

const PieChartComponent = ({ heirSharesList, total_amount, currency }: PieChartComponentProps) => {
  const screenWidth = Dimensions.get("window").width - 40

  // Generate random colors for the pie chart
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  // Prepare data for the pie chart
  const chartData = heirSharesList.map((heir) => {
    const totalAmount = heir.val * heir.amount
    return {
      name: capitalizeWords(heir.relation) + (heir.val > 1 ? ` × ${heir.val}` : ""),
      amount: totalAmount,
      percentage: Number.parseFloat(calculatePercentage(totalAmount, total_amount)),
      color: getRandomColor(),
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    }
  })

  return (
    <View style={styles.container}>
      {heirSharesList.length > 0 ? (
        <>
          <PieChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="percentage"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <View style={styles.legendContainer}>
            {chartData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                <View style={styles.legendTextContainer}>
                  <Text style={styles.legendName}>{item.name}</Text>
                  <Text style={styles.legendValue}>
                    {currency} {formatNumber(item.amount)} ({item.percentage}%)
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  legendContainer: {
    marginTop: 20,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendTextContainer: {
    flex: 1,
  },
  legendName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  legendValue: {
    fontSize: 12,
    color: "#666",
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
})

export default PieChartComponent
