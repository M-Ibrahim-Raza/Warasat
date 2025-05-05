import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateHeirSharesList } from "../store/heirsSlice";
import { calculatePercentage, formatNumber } from "../lib/utils";
import Heading from "../../Frontend/Components/Heading";
import DetailsDisplay from "../../Frontend/Components/DetailsDisplay";
import TableHeading from "../../Frontend/Components/Table/TableHeading";
import TableCell from "../../Frontend/Components/Table/TableCell";
import ViewToggle from "../../Frontend/Components/ViewToggle";
import PieChartComponent from "../../Frontend/Components/PieChartComponent";
import Button from "../../Frontend/Components/Button";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Permissions from "expo-permissions";

const Calculation = () => {
  const dispatch = useDispatch();
  const [viewToggle, setViewToggle] = useState(0);

  const amount = useSelector((state) => state.details.amount);
  const funeralExpenses = useSelector((state) => state.details.funeralExpenses);
  const mehr = useSelector((state) => state.details.mehr);
  const debt = useSelector((state) => state.details.debt);
  const will = useSelector((state) => state.details.will);
  const currency = useSelector((state) => state.details.currency);
  const gender = useSelector((state) => state.options.gender);
  const heirList = useSelector((state) => state.heirs.heirList);
  const heirSharesList = useSelector((state) => state.heirs.heirSharesList);
  
  const total_amount = amount - funeralExpenses - mehr - debt - will;

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/inheritance-calculation-xlsx",
        {
          total_amount: amount,
          funeral_expenses: funeralExpenses,
          mehr: mehr,
          debt: debt,
          will: will,
          currency: currency,
          gender: gender,
          heir_list: heirSharesList,
        },
        { responseType: "blob" }
      );

      console.log("✅ Excel Generation Request Sent Successfully");

      // Save the blob to a temporary file
      const fileUri = FileSystem.documentDirectory + "Inheritance-Calculation.xlsx";
      const base64Data = await blobToBase64(response.data);
      
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
        Alert.alert("Success", "Excel file generated successfully!");
      } else {
        Alert.alert("Error", "Sharing is not available on this device");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      Alert.alert("Error", "Failed to generate Excel file");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/inheritance-calculation-pdf",
        {
          total_amount: amount,
          funeral_expenses: funeralExpenses,
          mehr: mehr,
          debt: debt,
          will: will,
          currency: currency,
          gender: gender,
          heir_list: heirSharesList,
        },
        { responseType: "blob" }
      );

      console.log("✅ PDF Generation Request Sent Successfully");

      // Save the blob to a temporary file
      const fileUri = FileSystem.documentDirectory + "Inheritance-Calculation.pdf";
      const base64Data = await blobToBase64(response.data);
      
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
        Alert.alert("Success", "PDF file generated successfully!");
      } else {
        Alert.alert("Error", "Sharing is not available on this device");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      Alert.alert("Error", "Failed to generate PDF file");
    }
  };

  // Helper function to convert blob to base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1];
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const sendTestData = async () => {
    if (!heirList || heirList.length === 0) {
      console.warn("No heirs data to send.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/inheritance-calculator-2",
        {
          heir_list: heirList,
          total_amount: total_amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);

      if (response.data && response.data.heir_list) {
        dispatch(updateHeirSharesList(response.data.heir_list));
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch(updateHeirSharesList([]));
      Alert.alert("Error", "Failed to calculate inheritance shares");
    }
  };

  useEffect(() => {
    if (heirList && heirList.length > 0) {
      sendTestData();
    }
  }, []);

  const renderTable = () => (
    <ScrollView horizontal style={styles.tableContainer}>
      <View>
        <View style={styles.tableHeader}>
          <TableHeading>Relation</TableHeading>
          <TableHeading>Category</TableHeading>
          <TableHeading>Share</TableHeading>
          <TableHeading>Amount</TableHeading>
        </View>
        <ScrollView>
          {heirSharesList.map((heir, index) => {
            const display_count = heir.val > 1 ? ` × ${heir.val}` : "";
            const amount_display_count = heir.val > 1
              ? ` × ${heir.val} = ${formatNumber(heir.val * heir.amount)}`
              : "";
            const percentage_display_count = heir.val > 1
              ? ` × ${heir.val} = ${calculatePercentage(heir.val * heir.amount, total_amount)} %`
              : "";

            return (
              <View key={index} style={styles.tableRow}>
                <TableCell>{heir.relation + display_count}</TableCell>
                <TableCell>{heir.category[1]}</TableCell>
                <TableCell>
                  {calculatePercentage(heir.amount, total_amount) + " %" + percentage_display_count}
                </TableCell>
                <TableCell>
                  {currency + " " + formatNumber(heir.amount) + amount_display_count}
                </TableCell>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );

  return (
    <ScrollView style={styles.container}>
      <Heading style={styles.heading}>Islamic Inheritance Calculator</Heading>
      
      <View style={styles.assetScreen}>
        <Heading style={styles.subHeading}>Asset Details</Heading>
        
        <View style={styles.detailsContainer}>
          {(funeralExpenses !== "" ||
            mehr !== "" ||
            debt !== "" ||
            will !== "") && (
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
              {currency} {Number(total_amount).toLocaleString()}
            </Text>
          </DetailsDisplay>
        </View>
      </View>
      
      <View style={styles.inputScreen}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Heir Shares</Text>
          
          <ViewToggle
            viewToggle={viewToggle}
            setViewToggle={setViewToggle}
          />
          
          <View style={styles.buttonContainer}>
            <Button 
              style={styles.printButton}
              onPress={handleDownloadExcel}
            >
              Print Excel
            </Button>
            
            <Button 
              style={[styles.printButton, styles.pdfButton]}
              onPress={handleDownloadPDF}
            >
              Print PDF
            </Button>
          </View>
        </View>
        
        {viewToggle === 0 ? (
          renderTable()
        ) : (
          <View style={styles.chartContainer}>
            <PieChartComponent
              heirSharesList={heirSharesList}
              total_amount={total_amount}
              currency={currency}
            />
          </View>
        )}
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
  assetScreen: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 16,
    marginHorizontal: '10%',
  },
  subHeading: {
    width: 130,
    fontSize: 18,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  detailsContainer: {
    marginTop: 16,
    paddingBottom: 16,
  },
  expenseItem: {
    color: '#FF0000', // TCR1
    fontSize: 16,
  },
  inputScreen: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginHorizontal: '5%',
  },
  headerContainer: {
    position: 'relative',
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555555', // TCDG2
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  printButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  pdfButton: {
    marginTop: 8,
  },
  tableContainer: {
    borderWidth: 2,
    borderColor: '#E5E7EB', // TCT1
    borderRadius: 6,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0', // TCLG4
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // TCLG-1
  },
  chartContainer: {
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: '100%',
    height: 64,
  },
});

export default Calculation;