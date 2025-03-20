import React, { useState, useEffect, useRef, useCallback } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { capitalizeWords , calculatePercentage , formatNumber} from "@/Utilities/utilities";


const PieChartComponent = ({heirSharesList,total_amount,currency}) => {
  const chartRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 400, height: 200 });

  const valueFormatter = (item) => `${item.value}% = ${currency} ${formatNumber(item.value*total_amount)}`;

  // Function to update chart size dynamically
  const updateSize = useCallback(() => {
    if (chartRef.current) {
      const width = chartRef.current.offsetWidth;
      const height = width * 0.6; // Maintain aspect ratio (adjust as needed)
      setChartSize({ width, height });
    }
  }, []);

  // Update size on mount & window resize
  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);

  const pieChartData = heirSharesList.map((heir, index) => {
    
    let display_count = heir.val > 1 ? ` × ${heir.val}` : "";

    return({
    id: index,           // Use index as a unique identifier
    value: calculatePercentage(heir.val * heir.amount,total_amount),  // Assign heir's amount
    label: capitalizeWords(heir.relation)+display_count  // Assign heir's relation as label
  })});

  return (
    //Responsive container
    <div
          ref={chartRef}
          className="w-full"
        >
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value} %`,
                arcLabelMinAngle: 35,
                arcLabelRadius: "60%",
                data: pieChartData,
                valueFormatter,
                highlightScope: { highlighted: "item", faded: "series" },
                innerRadius: 2,
                faded: { innerRadius: 10, additionalRadius: -10 },
                cornerRadius: 5,
                startAngle: 0,
              },
            ]}

        tooltip={{
          trigger: "item", // Show tooltip when hovering over an item
          formatter: (params) => {
            return `
              <div style="text-align: center; font-size: 14px;">
                <strong>${params.data.label}</strong> <br />
                Share: ${params.data.value}%
              </div>
            `;
          },
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark background
          borderColor: "#fff", // White border
          textStyle: {
            color: "#fff", // White text
            fontSize: 14,
          },
        }}
        


            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontSize: "1rem",
              },
            }}
            width={chartSize.width} // Dynamic width
            height={chartSize.height} // Dynamic height
          />
        </div>
  );
};

export default PieChartComponent