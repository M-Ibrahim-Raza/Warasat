import React from 'react'
import Heading from "../../Components/Heading";
import DetailsDisplay from '../../Components/DetailsDisplay';
import Button from '../../Components/Button';
import { useSelector, useDispatch } from "react-redux";

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
import HeirButton from '@/../Components/HeirButton';


export const CalculateHeirs = () => {

  const amount = useSelector((state) => state.details.amount);
  const funeralExpenses = useSelector((state) => state.details.funeralExpenses);
  const mehr = useSelector((state) => state.details.mehr);
  const debt = useSelector((state) => state.details.debt);
  const will = useSelector((state) => state.details.will);
  const currency = useSelector((state) => state.details.currency);

  const total_amount = amount-funeralExpenses-mehr-debt-will

  return (
    <>
      <Heading className="w-[35rem]">Islamic Inheritance Calculator</Heading>
      <div id="asset-screen" className="bg-white/60 px-4 rounded-xl mt-4 mx-[25%] ">
        <Heading className="w-[13rem] text-xl !py-1.5">Asset Details</Heading>
        <div className='mt-4 pb-4'>
          <DetailsDisplay><span>Total Asset Amount</span><span>{currency} {amount}</span></DetailsDisplay>
          <DetailsDisplay className="text-TCR1 text-base"><span>Funeral & Burial Expenses</span><span>-{currency} {funeralExpenses}</span></DetailsDisplay>
          <DetailsDisplay className="text-TCR1 text-base"><span>Haq Mehr</span><span>-{currency} {mehr}</span></DetailsDisplay>
          <DetailsDisplay className="text-TCR1 text-base"><span>Debt & Liabilities</span><span>-{currency} {debt}</span></DetailsDisplay>
          <DetailsDisplay className="text-TCR1 text-base"><span>Will</span><span>-{currency} {will}</span></DetailsDisplay>
          <DetailsDisplay><span>Asset Amount To Be Distributed Among Heirs</span><span>Rs. {total_amount}</span></DetailsDisplay>
        </div>
      </div>
      <div id="input-screen" className="bg-white/60 p-4 rounded-xl mt-4 mx-[5%]">
        <div className='flex-col justify-center align-middle'>
          <div className='flex justify-center align-middle mb-2'>


            <Drawer>
              <DrawerTrigger>
                <Button className='!py-2'>Add Heir</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className='flex-col h-full flex my-6 mx-6 gap-y-6'>
                  <div className='1st flex flex-1 gap-6'>
                    <HeirButton className="flex-1">Son</HeirButton>
                    <HeirButton className="flex-1">Daughter</HeirButton>
                    <HeirButton className="flex-1">Father</HeirButton>
                    <HeirButton className="flex-1">Mother</HeirButton>
                    <HeirButton className="flex-1">Husband/Wife</HeirButton>
                  </div>
                  <div className='1st flex flex-1 gap-6'>
                    <HeirButton className="flex-1">Son's Son</HeirButton>
                    <HeirButton className="flex-1">Son's Daughter</HeirButton>
                    <HeirButton className="flex-1">Father's Father</HeirButton>
                    <HeirButton className="flex-1">Father's Mother</HeirButton>
                    <HeirButton className="flex-1">Mother's Mother</HeirButton>
                  </div>
                  <div className='1st flex flex-1 gap-6'>
                    <HeirButton className="flex-1">Real Brother</HeirButton>
                    <HeirButton className="flex-1">Real Sister</HeirButton>
                    <HeirButton className="flex-1">Paternal Brother</HeirButton>
                    <HeirButton className="flex-1">Paternal Sister</HeirButton>
                    <HeirButton className="flex-1">Maternal Sibling</HeirButton>
                  </div>
                </div>


              </DrawerContent>
            </Drawer>



          </div>
          <Heading className="w-[13rem] text-xl !py-1.5">Heir Details</Heading>
        </div>
      </div>
      <div className="w-full h-16"></div>
    </>
  )
}
