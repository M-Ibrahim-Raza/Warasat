import React, { useState, useEffect, useRef, useCallback } from "react";
import PieChartComponent from "@/../Components/PieChartComponent";

const Test = () => {

  return (
    <div className="mt-10 ml-10">
      <div className="flex flex-col items-center justify-center px-2 py-10 bg-white/60">
      <PieChartComponent></PieChartComponent>
      </div>
    </div>
  );
};

export default Test;
