"use client"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import { Stack, router } from "expo-router"
import { useSelector, useDispatch } from "react-redux"
import Navbar from "../components/Navbar"
import Heading from "../components/Heading"
import DetailsDisplay from "../components/DetailsDisplay"
import CustomButton from "../components/CustomButton"
import HeirInput from "../components/HeirInput"
import HeirButton from "../components/HeirButton"
import HeirDrawer from "../components/HeirDrawer"
import { updateHeirList, decrementHeirVal, deleteHeir } from "../store/heirsSlice"
import { capitalizeWords } from "../utils/utilities"
import {
  common_heirs,
  children_heirs_grouped,
  sibling_heirs,
  spouse_heir,
  heir_types,
  parent_heirs_grouped,
} from "../data/HeirsData"
import type { RootState } from "../store/store"

export default function InheritanceCalculatorHeirs() {
  const dispatch = useDispatch()
  const [heirType, setHeirType] = useState("")
  const [drawerVisible, setDrawerVisible] = useState(false)

  const amount = useSelector((state: RootState) => state.details.amount)
  const funeralExpenses = useSelector((state: RootState) => state.details.funeralExpenses)
  const mehr = useSelector((state: RootState) => state.details.mehr)
  const debt = useSelector((state: RootState) => state.details.debt)
  const will = useSelector((state: RootState) => state.details.will)
  const currency = useSelector((state: RootState) => state.details.currency)
  const gender = useSelector((state: RootState) => state.options.gender)
  const heirList = useSelector((state: RootState) => state.heirs.heirList)

  const total_amount = Number(amount) - Number(funeralExpenses) - Number(mehr) - Number(debt) - Number(will)

  const common_heirs_filtered = common_heirs.filter(
    (heir) => !(heir["relation"] === (gender === "male" ? "husband" : "wife")),
  )

  const spouse_heir_filtered = spouse_heir.filter(
    (heir) => !(heir["relation"] === (gender === "male" ? "husband" : "wife")),
  )

  const renderHeirOptions = () => {
    if (heirType === "Common Heirs" || heirType === "") {
      return (
        <View style={styles.heirGrid}>
          {common_heirs_filtered.map((heir, index) => (
            <HeirButton
              key={index}
              style={styles.heirButton}
              onClick={() => {
                dispatch(updateHeirList(heir))
              }}
            >
              {capitalizeWords(heir.relation)}
            </HeirButton>
          ))}
        </View>
      )
    } else if (heirType === "Parents") {
      return (
        <View style={styles.heirGrid}>
          {parent_heirs_grouped.flat().map((heir, index) => (
            <HeirButton
              key={index}
              style={styles.heirButton}
              onClick={() => {
                dispatch(updateHeirList(heir))
              }}
            >
              {capitalizeWords(heir.relation)}
            </HeirButton>
          ))}
        </View>
      )
    } else if (heirType === "Children") {
      return (
        <View style={styles.heirGrid}>
          {children_heirs_grouped.flat().map((heir, index) => (
            <HeirButton
              key={index}
              style={styles.heirButton}
              onClick={() => {
                dispatch(updateHeirList(heir))
              }}
            >
              {capitalizeWords(heir.relation)}
            </HeirButton>
          ))}
        </View>
      )
    } else if (heirType === "Siblings") {
      return (
        <View style={styles.heirGrid}>
          {sibling_heirs.map((heir, index) => (
            <HeirButton
              key={index}
              style={styles.heirButton}
              onClick={() => {
                dispatch(updateHeirList(heir))
              }}
            >
              {capitalizeWords(heir.relation)}
            </HeirButton>
          ))}
        </View>
      )
    } else if (heirType === "Spouse") {
      return (
        <View style={styles.heirGrid}>
          {spouse_heir_filtered.map((heir, index) => (
            <HeirButton
              key={index}
              style={styles.heirButton}
              onClick={() => {
                dispatch(updateHeirList(heir))
              }}
            >
              {capitalizeWords(heir.relation)}
            </HeirButton>
          ))}
        </View>
      )
    }
    return null
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
              <Text>Asset Amount To Be Distributed Among Heirs</Text>
              <Text>
                {currency} {total_amount.toLocaleString()}
              </Text>
            </DetailsDisplay>
          </View>
        </View>

        <View style={styles.heirsContainer}>
          <View style={styles.addHeirButtonContainer}>
            <CustomButton style={styles.addHeirButton} onPress={() => setDrawerVisible(true)}>
              Add Heir
            </CustomButton>
          </View>

          <Text style={styles.sectionTitle}>Heir Details</Text>

          <View style={styles.heirsList}>
            {heirList.map((heir, index) => (
              <HeirInput
                key={index}
                val={heir.val}
                isSingle={heir.limit === 1}
                onIncrement={() => {
                  heir.val < heir.limit && dispatch(updateHeirList(heir))
                }}
                onDecrement={() => {
                  heir.val > 1 ? dispatch(decrementHeirVal(heir)) : dispatch(deleteHeir(heir))
                }}
                onDelete={() => {
                  dispatch(deleteHeir(heir))
                }}
              >
                {capitalizeWords(heir.relation)}
              </HeirInput>
            ))}
          </View>

          {heirList.length > 0 && (
            <View style={styles.calculateButtonContainer}>
              <CustomButton style={styles.calculateButton} onPress={() => router.push("/inheritance-calculation" as any)}>
                Calculate Shares
              </CustomButton>
            </View>
          )}
        </View>
      </ScrollView>

      <HeirDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        heirTypes={heir_types}
        selectedType={heirType}
        onSelectType={setHeirType}
      >
        {renderHeirOptions()}
      </HeirDrawer>
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
  heirsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 12,
    marginHorizontal: "5%",
    marginTop: 16,
    padding: 16,
  },
  addHeirButtonContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  addHeirButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#006466",
  },
  heirsList: {
    marginTop: 10,
    gap: 8,
  },
  calculateButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  calculateButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#006466",
  },
  heirGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  heirButton: {
    width: "48%",
    marginBottom: 10,
  },
})
