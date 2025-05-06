import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  updateHeirList,
  decrementHeirVal,
  deleteHeir,
} from "../store/heirsSlice";
import {
  common_heirs,
  children_heirs_grouped,
  sibling_heirs,
  spouse_heir,
  heir_types,
  parent_heirs_grouped,
} from "../data/HeirsData";
import { capitalizeWords } from "../lib/utils";
import Heading from "../Frontend/Components/Heading";
import DetailsDisplay from "../Frontend/Components/DetailsDisplay";
import Button from "../Frontend/Components/Button";
import HeirInput from "../Frontend/Components/HeirInput";
import { Drawer } from "../components_ui/drawer";
import HeirButton from "../Frontend/Components/HeirButton";

export const CalculateHeirs = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [heirType, setHeirType] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const amount = useSelector((state) => state.details.amount);
  const funeralExpenses = useSelector((state) => state.details.funeralExpenses);
  const mehr = useSelector((state) => state.details.mehr);
  const debt = useSelector((state) => state.details.debt);
  const will = useSelector((state) => state.details.will);
  const currency = useSelector((state) => state.details.currency);
  const gender = useSelector((state) => state.options.gender);
  const heirList = useSelector((state) => state.heirs.heirList);

  const total_amount = amount - funeralExpenses - mehr - debt - will;

  const common_heirs_filtered = common_heirs.filter(
    (heir) => !(heir["relation"] === (gender === "male" ? "husband" : "wife"))
  );

  const spouse_heir_filtered = spouse_heir.filter(
    (heir) => !(heir["relation"] === (gender === "male" ? "husband" : "wife"))
  );

  const common_heirs_groups = common_heirs_filtered.reduce(
    (common_heirs_groups, heir, ind) => {
      if (ind % 5 === 0) {
        common_heirs_groups.push(common_heirs_filtered.slice(ind, ind + 5));
      }
      return common_heirs_groups;
    },
    []
  );

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const renderDrawerContent = () => {
    return (
      <ScrollView style={styles.drawerContent}>
        {(heirType === "Common Heirs" || heirType === "") &&
          common_heirs_groups.map((current_group, group_ind) => (
            <View key={group_ind} style={styles.heirRow}>
              {current_group.map((heir, ind) => (
                <HeirButton
                  key={group_ind * current_group.length + ind}
                  style={styles.heirButton}
                  onPress={() => {
                    dispatch(updateHeirList(heir));
                    closeDrawer();
                  }}
                >
                  {capitalizeWords(heir["relation"])}
                </HeirButton>
              ))}
            </View>
          ))}

        {heirType === "Parents" &&
          parent_heirs_grouped.map((current_group, group_ind) => (
            <View key={group_ind} style={styles.heirRow}>
              {current_group.map((heir, ind) => (
                <HeirButton
                  key={group_ind * current_group.length + ind}
                  style={styles.heirButton}
                  onPress={() => {
                    dispatch(updateHeirList(heir));
                    closeDrawer();
                  }}
                >
                  {capitalizeWords(heir["relation"])}
                </HeirButton>
              ))}
            </View>
          ))}

        {heirType === "Children" &&
          children_heirs_grouped.map((current_group, group_ind) => (
            <View key={group_ind} style={styles.heirRow}>
              {current_group.map((heir, ind) => (
                <HeirButton
                  key={group_ind * current_group.length + ind}
                  style={styles.heirButton}
                  onPress={() => {
                    dispatch(updateHeirList(heir));
                    closeDrawer();
                  }}
                >
                  {capitalizeWords(heir["relation"])}
                </HeirButton>
              ))}
            </View>
          ))}

        {heirType === "Siblings" && (
          <View style={styles.heirRow}>
            {sibling_heirs.map((heir, ind) => (
              <HeirButton
                key={ind}
                style={styles.heirButton}
                onPress={() => {
                  dispatch(updateHeirList(heir));
                  closeDrawer();
                }}
              >
                {capitalizeWords(heir["relation"])}
              </HeirButton>
            ))}
          </View>
        )}

        {heirType === "Spouse" && (
          <View style={styles.heirRowCenter}>
            <HeirButton
              style={styles.spouseButton}
              onPress={() => {
                dispatch(updateHeirList(spouse_heir_filtered[0]));
                closeDrawer();
              }}
            >
              {capitalizeWords(spouse_heir_filtered[0]["relation"])}
            </HeirButton>
          </View>
        )}
      </ScrollView>
    );
  };

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
        <View style={styles.addHeirContainer}>
          <Button 
            style={styles.addHeirButton}
            onPress={openDrawer}
          >
            Add Heir
          </Button>
        </View>
        
        <Heading style={styles.subHeading}>Heir Details</Heading>
        
        <View style={styles.heirListContainer}>
          {heirList.map((heir, index) => (
            <HeirInput
              key={index}
              onDelete={() => {
                dispatch(deleteHeir(heir));
              }}
              isSingle={heir["limit"] === 1}
              onIncrement={() => {
                heir["val"] < heir["limit"] &&
                  dispatch(updateHeirList(heir));
              }}
              val={heir["val"]}
              onDecrement={() => {
                heir["val"] > 1
                  ? dispatch(decrementHeirVal(heir))
                  : dispatch(deleteHeir(heir));
              }}
            >
              {capitalizeWords(heir["relation"])}
            </HeirInput>
          ))}
        </View>
        
        {heirList.length !== 0 && (
          <View style={styles.calculateButtonContainer}>
            <Button 
              style={styles.calculateButton}
              onPress={() => navigation.navigate('InheritanceCalculation')}
            >
              Calculate Shares
            </Button>
          </View>
        )}
      </View>
      
      <View style={styles.spacer} />
      
      <Drawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        title="Add Heir"
        description="Select heir type"
      >
        {renderDrawerContent()}
      </Drawer>
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
    marginHorizontal: '25%',
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
    paddingBottom: 32,
  },
  addHeirContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  addHeirButton: {
    paddingVertical: 8,
  },
  heirListContainer: {
    marginTop: 24,
    gap: 8,
  },
  calculateButtonContainer: {
    alignItems: 'center',
  },
  calculateButton: {
    marginTop: 24,
    paddingVertical: 8,
  },
  spacer: {
    width: '100%',
    height: 64,
  },
  drawerContent: {
    flex: 1,
    padding: 24,
  },
  heirRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },
  heirRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  heirButton: {
    flex: 1,
    minWidth: 100,
  },
  spouseButton: {
    width: '40%',
  },
});

export default CalculateHeirs;