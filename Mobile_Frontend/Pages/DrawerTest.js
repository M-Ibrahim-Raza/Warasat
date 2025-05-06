import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import HeirButton from "../Frontend/Components/HeirButton";
import Button from "../Frontend/Components/Button";
import { Drawer } from "../components_ui/drawer";

const DrawerTest = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <View style={styles.container}>
      <HeirButton style={styles.heirButton}>
        Test Heir Button
      </HeirButton>
      
      <Button 
        style={styles.openButton}
        onPress={openDrawer}
      >
        Open
      </Button>
      
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="Are you absolutely sure?"
        description="This action cannot be undone."
      >
        <View style={styles.drawerContent}>
          <Button onPress={() => console.log("Submit pressed")}>
            Submit
          </Button>
          
          <Button 
            style={styles.cancelButton}
            onPress={closeDrawer}
          >
            Cancel
          </Button>
        </View>
      </Drawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  heirButton: {
    marginVertical: 20,
  },
  openButton: {
    marginTop: 100,
  },
  drawerContent: {
    padding: 16,
    gap: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
  },
});

export default DrawerTest;