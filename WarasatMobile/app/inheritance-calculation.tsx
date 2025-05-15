"use client"
import axios from "axios"
import { Stack, useRouter } from "expo-router"
import { Share as ShareIcon } from "lucide-react-native"
import { useEffect, useState } from "react"
import { Alert, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import DetailsDisplay from "../components/DetailsDisplay"
import Heading from "../components/Heading"
import Navbar from "../components/Navbar"
import PieChartComponent from "../components/PieChartComponent"
import TableCell from "../components/TableCell"
import TableHeading from "../components/TableHeading"
import ViewToggle from "../components/ViewToggle"
import { updateHeirSharesList } from "../store/heirsSlice"
import type { RootState } from "../store/store"
import { calculatePercentage, formatNumber } from "../utils/utilities"

export default function InheritanceCalculation() {
  const dispatch = useDispatch()
  const [viewToggle, setViewToggle] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const amount = useSelector((state: RootState) => state.details.amount)
  const funeralExpenses = useSelector((state: RootState) => state.details.funeralExpenses)
  const mehr = useSelector((state: RootState) => state.details.mehr)
  const debt = useSelector((state: RootState) => state.details.debt)
  const will = useSelector((state: RootState) => state.details.will)
  const currency = useSelector((state: RootState) => state.details.currency)
  const gender = useSelector((state: RootState) => state.options.gender)
  const heirList = useSelector((state: RootState) => state.heirs.heirList)
  const heirSharesList = useSelector((state: RootState) => state.heirs.heirSharesList)

  const total_amount = Number(amount) - Number(funeralExpenses) - Number(mehr) - Number(debt) - Number(will)

  const sendDataToAPI = async () => {
    if (!heirList || heirList.length === 0) {
      Alert.alert("Error", "No heirs data to send.")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      // For development on a physical device, you'll need to use your computer's local network IP
      // instead of localhost or 127.0.0.1
      const response = await axios.post(
        "http://192.168.18.7:8080/inheritance-calculator-2", // Replace with your actual IP address
        {
          heir_list: heirList,
          total_amount: total_amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      console.log("API Response:", response.data)

      if (response.data && response.data.heir_list) {
        dispatch(updateHeirSharesList(response.data.heir_list))
      }
    } catch (error) {
      console.error("Error:", error)
      Alert.alert("Error", "Failed to calculate inheritance shares. Please try again.")
      dispatch(updateHeirSharesList([]))
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    try {
      let message = "Islamic Inheritance Calculation\n\n"
      message += `Total Asset Amount: ${currency} ${Number(amount).toLocaleString()}\n`
      if (funeralExpenses) message += `Funeral Expenses: ${currency} ${Number(funeralExpenses).toLocaleString()}\n`
      if (mehr) message += `Haq Mehr: ${currency} ${Number(mehr).toLocaleString()}\n`
      if (debt) message += `Debt: ${currency} ${Number(debt).toLocaleString()}\n`
      if (will) message += `Will: ${currency} ${Number(will).toLocaleString()}\n`
      message += `Amount Distributed: ${currency} ${total_amount.toLocaleString()}\n\n`

      message += "Heir Shares:\n"
      heirSharesList.forEach((heir) => {
        const displayCount = heir.val > 1 ? ` × ${heir.val}` : ""
        const totalAmount = heir.val * heir.amount
        message += `${heir.relation}${displayCount}: ${currency} ${formatNumber(totalAmount)} (${calculatePercentage(totalAmount, total_amount)}%)\n`
      })

      await Share.share({
        message,
        title: "Islamic Inheritance Calculation",
      })
    } catch (error) {
      Alert.alert("Error", "Failed to share calculation results.")
    }
  }

  useEffect(() => {
    sendDataToAPI()
  }, [])

  // Helper function to safely get category
  const getCategoryName = (heir: any): string => {
    return heir.category
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Heading>Islamic Inheritance Calculator</Heading>

        <View style={styles.assetContainer}>
          <Text style={styles.sectionTitle}>Asset Details</Text>

          <View style={styles.detailsContainer}>
            {(funeralExpenses !== "" || mehr !== "" || debt !== "" || will !== "") && (
              <DetailsDisplay>
                <Text>Total Asset Amount</Text>
                <Text>
                  {currency} {Number(amount).toLocaleString()}
                </Text>
              </DetailsDisplay>
            )}

            {funeralExpenses !== "" && (
              <DetailsDisplay style={styles.expenseItem}>
                <Text>Funeral & Burial Expenses</Text>
                <Text>
                  -{currency} {Number(funeralExpenses).toLocaleString()}
                </Text>
              </DetailsDisplay>
            )}

            {mehr !== "" && (
              <DetailsDisplay style={styles.expenseItem}>
                <Text>Haq Mehr</Text>
                <Text>
                  -{currency} {Number(mehr).toLocaleString()}
                </Text>
              </DetailsDisplay>
            )}

            {debt !== "" && (
              <DetailsDisplay style={styles.expenseItem}>
                <Text>Debt & Liabilities</Text>
                <Text>
                  -{currency} {Number(debt).toLocaleString()}
                </Text>
              </DetailsDisplay>
            )}

            {will !== "" && (
              <DetailsDisplay style={styles.expenseItem}>
                <Text>Will</Text>
                <Text>
                  -{currency} {Number(will).toLocaleString()}
                </Text>
              </DetailsDisplay>
            )}

            <DetailsDisplay>
              <Text>Asset To Be Distributed</Text>
              <Text>
                {currency} {total_amount.toLocaleString()}
              </Text>
            </DetailsDisplay>
          </View>
        </View>

        <View style={styles.resultsContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.resultsTitle}>Heir Shares</Text>
            <ViewToggle viewToggle={viewToggle} setViewToggle={setViewToggle} />
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <ShareIcon size={20} color="#003049" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Calculating shares...</Text>
            </View>
          ) : viewToggle === 0 ? (
            // Updated table section for InheritanceCalculation.tsx

// Updated table section without Category column

<View style={styles.tableContainer}>
  <ScrollView horizontal showsHorizontalScrollIndicator={true}>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <TableHeading width={160}>Relation</TableHeading>
        <TableHeading width={140}>Share</TableHeading>
        <TableHeading width={180}>Amount</TableHeading>
      </View>

      {heirSharesList.map((heir, index) => {
        const displayCount = heir.val > 1 ? ` × ${heir.val}` : ""
        const amountDisplayCount =
          heir.val > 1 ? ` × ${heir.val} = ${formatNumber(heir.val * heir.amount)}` : ""
        const percentageDisplayCount =
          heir.val > 1
            ? ` × ${heir.val} = ${calculatePercentage(heir.val * heir.amount, total_amount)} %`
            : ""

        return (
          <View key={index} style={styles.tableRow}>
            <TableCell width={160}>
              {heir.relation + displayCount}
            </TableCell>
            <TableCell width={140}>
              {calculatePercentage(heir.amount, total_amount) + " %" + percentageDisplayCount}
            </TableCell>
            <TableCell width={180}>{currency + " " + formatNumber(heir.amount) + amountDisplayCount}</TableCell>
          </View>
        )
      })}
    </View>
  </ScrollView>
          </View>
          ) : (
            <PieChartComponent heirSharesList={heirSharesList} total_amount={total_amount} currency={currency} />
          )}
        </View>
        {heirSharesList.length > 0 && (
          <View style={styles.verifyContainer}>
            <TouchableOpacity style={styles.verifyButton} onPress={() => router.push("/ulema-verification" as any)}>
              <Text style={styles.verifyButtonText}>Verify with Ulema</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8f3dc",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  assetContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 12,
    marginHorizontal: "5%",
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003049",
    textAlign: "center",
    marginVertical: 10,
  },
  detailsContainer: {
    marginTop: 10,
  },
  expenseItem: {
    backgroundColor: "rgba(255, 235, 235, 0.8)",
  },
  resultsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 12,
    marginHorizontal: "5%",
    marginTop: 16,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003049",
  },
  shareButton: {
    padding: 8,
    backgroundColor: "#e6f9e6",
    borderRadius: 8,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  tableContainer: {
  borderWidth: 1,
  borderColor: "#006466",
  borderRadius: 8,
  overflow: "hidden",
  marginBottom: 10,
},
table: {
  // minWidth is removed as we're now using fixed widths
},
tableHeader: {
  flexDirection: "row",
  backgroundColor: "#e6f9e6",
  borderBottomWidth: 1,
  borderBottomColor: "#006466",
},
tableRow: {
  flexDirection: "row",
  borderBottomWidth: 1,
  borderBottomColor: "#e0e0e0",
  backgroundColor: "white",
},
  verifyContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: "#003049",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})
