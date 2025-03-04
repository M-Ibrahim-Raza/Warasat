import React from "react";
import { useState } from "react";
import Heading from "../../Components/Heading";
import RadioButton from "../../Components/RadioButton";
import OptionToggle from "../../Components/OptionToggle";
import ValInput from "../../Components/ValInput";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAmount,setFuneralExpenses,setMehr,setDebt,setWill} from "../store/detailsSlice";

const Calculator = () => {
  
  const dispatch = useDispatch();
  
  const amount = useSelector((state) => state.details.amount);
  const funeralExpenses = useSelector((state) => state.details.funeralExpenses);
  const mehr = useSelector((state) => state.details.mehr);
  const debt = useSelector((state) => state.details.debt);
  const will = useSelector((state) => state.details.will);
  const currency = useSelector((state) => state.details.currency);

  const [distributionMethod, setDistributionMethod] = useState("amount");
  const [gender, setGender] = useState("male");
  const [funeralExpensesToggle, setFuneralExpensesToggle] = useState(false);
  const [mehrToggle, setMehrToggle] = useState(false);
  const [debtToggle, setDebtToggle] = useState(false);
  const [willToggle, setWillToggle] = useState(true);

  return (
    <>
      <Heading className="w-[35rem]">Islamic Inheritance Calculator</Heading>
      <div id="input-screen" className="bg-white/60 p-4 rounded-xl mt-4 mx-[10%]">

        <h1 className="mx-auto text-center pb-2 text-lg font-Montserrat font-bold text-TCDG2 drop-shadow-lg ">Distribution Method</h1>

        <form className="flex gap-6 justify-center">
          <RadioButton
            id="amount"
            name="payment"
            value="amount"
            checked={distributionMethod === "amount"}
            onChange={(e) => setDistributionMethod(e.target.value)}
          >
            Amount
          </RadioButton>

          <RadioButton
            id="percentage"
            name="payment"
            value="percentage"
            checked={distributionMethod === "percentage"}
            onChange={(e) => setDistributionMethod(e.target.value)}
          >
            Percentage
          </RadioButton>
        </form>

        <h1 className="mt-4 mx-auto text-center pb-2 text-lg font-Montserrat font-bold text-TCDG2 drop-shadow-lg ">Gender</h1>

        <form className="flex gap-6 justify-center">
          <RadioButton
            id="male"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={(e) => setGender(e.target.value)}
          >
            Male
          </RadioButton>

          <RadioButton
            id="female"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={(e) => setGender(e.target.value)}
          >
            Female
          </RadioButton>
        </form>

        <h1 className="mt-4 mx-auto text-center pb-2 text-lg font-Montserrat font-bold text-TCDG2 drop-shadow-lg ">Options</h1>
        <div className="options flex flex-row gap-4 items-center justify-center">


          {distributionMethod === "amount" && <OptionToggle className="funeral-toggle" checked={funeralExpensesToggle} onCheckedChange={setFuneralExpensesToggle}>Funeral Expenses</OptionToggle>}

          {gender === "male" && distributionMethod === "amount" && <OptionToggle className="mehr-toggle" checked={mehrToggle} onCheckedChange={setMehrToggle}>Haq Mehr</OptionToggle>}

          {distributionMethod === "amount" && <OptionToggle className="debt-toggle" checked={debtToggle} onCheckedChange={setDebtToggle}>Debt</OptionToggle>}

          <OptionToggle className="will-toggle" checked={willToggle} onCheckedChange={setWillToggle}>Will</OptionToggle>

        </div>

        <h1 className="mt-4 mx-auto text-center text-lg font-Montserrat font-bold text-TCDG2 drop-shadow-lg ">Details</h1>
        <div className="inputs flex flex-col justify-center items-center gap-2">

          {distributionMethod === "amount" && <ValInput className="amount-input" id="amount" value={amount} placeholder="Enter Amount that Deceased have left" label="Amount" onChange={(e) => dispatch(setAmount(e.target.value))} currencies={["Rs", "$", "€", "£"]} currency={currency}></ValInput>}

          {distributionMethod === "amount" && funeralExpensesToggle && <ValInput className="funeral-expenses-input" id="funeral-expenses" value={funeralExpenses} placeholder="Enter Funeral and Burial Expenses" label="Funeral Expenses" onChange={(e) => dispatch(setFuneralExpenses(e.target.value))} currency={currency} ></ValInput>}

          {distributionMethod === "amount" && mehrToggle && <ValInput className="mehr-input" id="mehr-expenses" value={mehr} placeholder="Enter Haq Mehr" label="Haq Mehr" onChange={(e) => dispatch(setMehr(e.target.value))} currency={currency} ></ValInput>}

          {distributionMethod === "amount" && debtToggle && <ValInput className="debt-input" id="debt" value={debt} placeholder="Enter Debt & Liabilities" label="Debt & Liabilities" onChange={(e) => dispatch(setDebt(e.target.value))} currency={currency} ></ValInput>}

          {willToggle && <ValInput className="will-input" id="will" value={will} placeholder="Enter Will Amount" label="Will" onChange={(e) => dispatch(setWill(e.target.value))} currency={currency} ></ValInput>}

          <Link to='/inheritance-calculator-heirs'>
            <Button className="mt-6 !py-2">Proceed to Next Step &gt;</Button>
          </Link>
        </div>
      </div>
      <div className="w-full h-16"></div>
    </>
  );
};

export default Calculator;
