import React, { useState, useEffect, useRef, useCallback } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const PieChartComponent = () => {
  const chartRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 400, height: 200 });

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

  return (
    //Responsive container
    <div
          ref={chartRef}
          className="w-full"
        >
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value}%`,
                arcLabelMinAngle: 35,
                arcLabelRadius: "60%",
                data: [
                  { id: 0, value: 10, label: "Series A" },
                  { id: 1, value: 15, label: "Series B" },
                  { id: 2, value: 20, label: "Series C" },
                ],
                highlightScope: { highlighted: "item", faded: "series" },
                innerRadius: 2,
                cornerRadius: 5,
                startAngle: 0,
              },
            ]}
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