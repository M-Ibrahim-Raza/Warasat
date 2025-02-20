import React from "react";
import { useState } from "react";
import Heading from "../../Components/Heading";
import RadioButton from "../../Components/RadioButton";


const Calculator = () => {

  const [distributionMethod, setDistributionMethod] = useState("");


  return (
    <div>
      <Heading className="w-[35rem]">Islamic Inheritance Calculator</Heading>
      <div id="input-screen" className="bg-white/60 p-4 mt-4 mx-[10%]">

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

      </div>
    </div>
  );
};

export default Calculator;
