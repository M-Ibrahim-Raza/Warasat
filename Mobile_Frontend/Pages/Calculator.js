import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Heading from "../../Frontend/Components/Heading";
import RadioButton from "../../Frontend/Components/RadioButton";
import OptionToggle from "../../Frontend/Components/OptionToggle";
import ValInput from "../../Frontend/Components/ValInput";
import Button from "../../Frontend/Components/Button";
import { 
  setAmount, 
  setFuneralExpenses, 
  setMehr, 
  setDebt, 
  setWill 
} from "../store/detailsSlice";
import { 
  setDistributionMethod, 
  setGender, 
  toggleFuneralExpenses, 
  toggleMehr, 
  toggleDebt, 
  toggleWill 
} from "../store/optionsSlice";

const Calculator = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const amount = useSelector((state) => state.details.amount);
  const funeralExpenses = useSelector((state) => state.details.funeralExpenses);
  const mehr = useSelector((state) => state.details.mehr);
  const debt = useSelector((state) => state.details.debt);
  const will = useSelector((state) => state.details.will);
  const currency = useSelector((state) => state.details.currency);

  const distributionMethod = useSelector((state) => state.options.distributionMethod);
  const gender = useSelector((state) => state.options.gender);
  const funeralExpensesOption = useSelector((state) => state.options.funeralExpenses);
  const mehrOption = useSelector((state) => state.options.mehr);
  const debtOption = useSelector((state) => state.options.debt);
  const willOption = useSelector((state) => state.options.will);

  return (
    <ScrollView style={styles.container}>
      <Heading style={styles.heading}>Islamic Inheritance Calculator</Heading>
      
      <View style={styles.inputScreen}>
        <Text style={styles.sectionTitle}>Distribution Method</Text>

        <View style={styles.radioGroup}>
          <RadioButton
            id="amount"
            name="payment"
            value="amount"
            checked={distributionMethod === "amount"}
            onChange={(e) => dispatch(setDistributionMethod(e.target.value))}
          >
            Amount
          </RadioButton>

          <RadioButton
            id="percentage"
            name="payment"
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
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={(e) => dispatch(setGender(e.target.value))}
          >
            Male
          </RadioButton>

          <RadioButton
            id="female"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={(e) => dispatch(setGender(e.target.value))}
          >
            Female
          </RadioButton>
        </View>

        <Text style={styles.sectionTitle}>Options</Text>
        
        <View style={styles.optionsContainer}>
          {distributionMethod === "amount" && (
            <OptionToggle 
              checked={funeralExpensesOption} 
              onCheckedChange={() => {
                dispatch(toggleFuneralExpenses());
                dispatch(setFuneralExpenses(""));
              }}
            >
              Funeral Expenses
            </OptionToggle>
          )}

          {gender === "male" && distributionMethod === "amount" && (
            <OptionToggle 
              checked={mehrOption} 
              onCheckedChange={() => {
                dispatch(toggleMehr());
                dispatch(setMehr(""));
              }}
            >
              Haq Mehr
            </OptionToggle>
          )}

          {distributionMethod === "amount" && (
            <OptionToggle 
              checked={debtOption} 
              onCheckedChange={() => {
                dispatch(toggleDebt());
                dispatch(setDebt(""));
              }}
            >
              Debt
            </OptionToggle>
          )}

          <OptionToggle 
            checked={willOption} 
            onCheckedChange={() => {
              dispatch(toggleWill());
              dispatch(setWill(""));
            }}
          >
            Will
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
              onChange={(e) => dispatch(setAmount(Number(e.target.value.replace(/,/g, ""))))} 
              currencies={["Rs", "$", "€", "£"]} 
              currency={currency}
            />
          )}

          {distributionMethod === "amount" && funeralExpensesOption && (
            <ValInput 
              id="funeral-expenses" 
              value={funeralExpenses} 
              placeholder="Enter Funeral and Burial Expenses" 
              label="Funeral Expenses" 
              onChange={(e) => dispatch(setFuneralExpenses(Number(e.target.value.replace(/,/g, ""))))} 
              currency={currency}
            />
          )}

          {distributionMethod === "amount" && mehrOption && (
            <ValInput 
              id="mehr-expenses" 
              value={mehr} 
              placeholder="Enter Haq Mehr" 
              label="Haq Mehr" 
              onChange={(e) => dispatch(setMehr(Number(e.target.value.replace(/,/g, ""))))} 
              currency={currency}
            />
          )}

          {distributionMethod === "amount" && debtOption && (
            <ValInput 
              id="debt" 
              value={debt} 
              placeholder="Enter Debt & Liabilities" 
              label="Debt & Liabilities" 
              onChange={(e) => dispatch(setDebt(Number(e.target.value.replace(/,/g, ""))))} 
              currency={currency}
            />
          )}

          {willOption && (
            <ValInput 
              id="will" 
              value={will} 
              placeholder="Enter Will Amount" 
              label="Will" 
              onChange={(e) => dispatch(setWill(Number(e.target.value.replace(/,/g, ""))))} 
              currency={currency}
            />
          )}

          <Button 
            style={styles.proceedButton}
            onPress={() => navigation.navigate('InheritanceCalculatorHeirs')}
          >
            Proceed to Next Step &gt;
          </Button>
        </View>
      </View>
      
      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // TCLG2
  },
  heading: {
    width: '90%',
    alignSelf: 'center',
  },
  inputScreen: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginHorizontal: '10%',
  },
  sectionTitle: {
    textAlign: 'center',
    paddingBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555555', // TCDG2
    fontFamily: 'Montserrat-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginTop: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    alignItems: 'center',
    gap: 8,
  },
  proceedButton: {
    marginTop: 24,
    paddingVertical: 8,
  },
  spacer: {
    width: '100%',
    height: 64,
  },
});

export default Calculator;