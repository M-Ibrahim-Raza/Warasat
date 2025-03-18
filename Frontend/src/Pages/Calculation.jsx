import React from "react";
import Heading from "../../Components/Heading";
import { useSelector, useDispatch } from "react-redux";

const Calculation = () => {
  const heirList = useSelector((state) => state.heirs.heirList);

  return (
    <>
      <Heading className="w-[35rem]">Islamic Inheritance Calculator</Heading>
      <div
        id="input-screen"
        className="bg-white/60 p-4 rounded-xl mt-4 mx-[10%]"
      >
        {heirList}
      </div>

      <div className="w-full h-16"></div>
    </>
  );
};

export default Calculation;
