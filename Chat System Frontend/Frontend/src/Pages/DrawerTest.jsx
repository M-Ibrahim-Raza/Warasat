import React, { useState } from "react";
import { Switch } from "@/components/ui/switch"; // Ensure the path is correct
// import OptionToggle from "/../Components/OptionToggle";
import OptionToggle from "../../Components/OptionToggle";
import ValInput from "../../Components/ValInput";
import Button from "../../Components/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import HeirButton from "@/../Components/HeirButton";


const Test = () => {


  return (
    <>
      <br />
      <HeirButton />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Drawer>
        <DrawerTrigger><Button>Open</Button></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Test;
