"use client"
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import { Stack, Link } from "expo-router"
import { useSelector, useDispatch } from "react-redux"
import Navbar from "../components/Navbar"
import Heading from "../components/Heading"
import RadioButton from "../components/RadioButton"
import OptionToggle from "../components/OptionToggle"
import ValInput from "../components/ValInput"
import CustomButton from "../components/CustomButton"
import type { RootState } from "../store/store"
import { setAmount, setFuneralExpenses, setMehr, setDebt, setWill } from "../store/detailsSlice"
import {
  setDistributionMethod,
  setGender,
  toggleFuneralExpenses,
  toggleMehr,
  toggleDebt,
  toggleWill,
} from "../store/optionsSlice"

export default function InheritanceCalculator() {
  const dispatch = useDispatch()

  const amount = useSelector((state: RootState) => state.details.amount)
  const funeralExpenses = useSelector((state: RootState) => state.details.funeralExpenses)
  const mehr = useSelector((state: RootState) => state.details.mehr)
  const debt = useSelector((state: RootState) => state.details.debt)
  const will = useSelector((state: RootState) => state.details.will)
  const currency = useSelector((state: RootState) => state.details.currency)

  const distributionMethod = useSelector((state: RootState) => state.options.distributionMethod)
  const gender = useSelector((state: RootState) => state.options.gender)
  const funeralExpensesOption = useSelector((state: RootState) => state.options.funeralExpenses)
  const mehrOption = useSelector((state: RootState) => state.options.mehr)
  const debtOption = useSelector((state: RootState) => state.options.debt)
  const willOption = useSelector((state: RootState) => state.options.will)

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Heading>Islamic Inheritance Calculator</Heading>

        <View style={styles.inputScreen}>
          <Text style={styles.sectionTitle}>Distribution Method</Text>

          <View style={styles.radioGroup}>
            <RadioButton
              id="amount"
              value="amount"
              checked={distributionMethod === "amount"}
              onChange={(e) => dispatch(setDistributionMethod(e.target.value))}
            >
              Amount
            </RadioButton>

            <RadioButton
              id="percentage"
              value="percentage"
              checked={distributionMethod === "percentage"}
              onChange={(e) => dispatch(setDistributionMethod(e.target.value))}
            >
              Percentage
            </RadioButton>
          </View>

          <Text style={styles.sectionTitle}>Gender</Text>

          <View style={styles.radioGroup}>
            <RadioButton
              id="male"
              value="male"
              checked={gender === "male"}
              onChange={(e) => dispatch(setGender(e.target.value))}
            >
              Male
            </RadioButton>

            <RadioButton
              id="female"
              value="female"
              checked={gender === "female"}
              onChange={(e) => dispatch(setGender(e.target.value))}
            >
              Female
            </RadioButton>
          </View>

          <Text style={styles.sectionTitle}>Options</Text>

          <View style={styles.optionsGroup}>
            {distributionMethod === "amount" && (
              <OptionToggle
                checked={funeralExpensesOption}
                onCheckedChange={() => {
                  dispatch(toggleFuneralExpenses())
                  dispatch(setFuneralExpenses(""))
                }}
              >
                Add{"\n"}Funeral Expenses
              </OptionToggle>
            )}

            {gender === "male" && distributionMethod === "amount" && (
              <OptionToggle
                checked={mehrOption}
                onCheckedChange={() => {
                  dispatch(toggleMehr())
                  dispatch(setMehr(""))
                }}
              >
                Add{"\n"}Haq Mehr
              </OptionToggle>
            )}

            {distributionMethod === "amount" && (
              <OptionToggle
                checked={debtOption}
                onCheckedChange={() => {
                  dispatch(toggleDebt())
                  dispatch(setDebt(""))
                }}
              >
                Add{"\n"}Debt
              </OptionToggle>
            )}

            <OptionToggle
              checked={willOption}
              onCheckedChange={() => {
                dispatch(toggleWill())
                dispatch(setWill(""))
              }}
            >
              Add{"\n"}Will
            </OptionToggle>
          </View>

          <Text style={styles.sectionTitle}>Details</Text>

          <View style={styles.inputsContainer}>
            {distributionMethod === "amount" && (
              <ValInput
                id="amount"
                value={amount}
                placeholder="Enter Amount that Deceased have left"
                label="Amount"
                onChange={(e) => dispatch(setAmount(e.target.value))}
                currency={currency}
              />
            )}

            {distributionMethod === "amount" && funeralExpensesOption && (
              <ValInput
                id="funeral-expenses"
                value={funeralExpenses}
                placeholder="Enter Funeral and Burial Expenses"
                label="Funeral Expenses"
                onChange={(e) => dispatch(setFuneralExpenses(e.target.value))}
                currency={currency}
              />
            )}

            {distributionMethod === "amount" && mehrOption && (
              <ValInput
                id="mehr-expenses"
                value={mehr}
                placeholder="Enter Haq Mehr"
                label="Haq Mehr"
                onChange={(e) => dispatch(setMehr(e.target.value))}
                currency={currency}
              />
            )}

            {distributionMethod === "amount" && debtOption && (
              <ValInput
                id="debt"
                value={debt}
                placeholder="Enter Debt & Liabilities"
                label="Debt & Liabilities"
                onChange={(e) => dispatch(setDebt(e.target.value))}
                currency={currency}
              />
            )}

            {willOption && (
              <ValInput
                id="will"
                value={will}
                placeholder="Enter Will Amount"
                label="Will"
                onChange={(e) => dispatch(setWill(e.target.value))}
                currency={currency}
              />
            )}

            <Link href= {"/inheritance-calculator-heirs" as any} asChild>
              <CustomButton style={styles.proceedButton}>Proceed to Next Step &gt;</CustomButton>
            </Link>
          </View>
        </View>
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
  inputScreen: {
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
    marginTop: 16,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 10,
  },
  optionsGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  inputsContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  proceedButton: {
    marginTop: 24,
    paddingVertical: 12,
    width: 200,
    backgroundColor: "#006466",
  },
})
