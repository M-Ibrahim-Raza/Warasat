import React from "react";
import Heading from "../../Components/Heading";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DetailsDisplay from "../../Components/DetailsDisplay";
import TableHeading from "@/../Components/Table/TableHeading";
import TableCell from "@/../Components/Table/TableCell";
import ViewToggle from "@/../Components/ViewToggle";
import PieChartComponent from "@/../Components/PieChartComponent";
import axios from "axios";
import { useEffect } from "react";

const sendTestData = async (heirList, total_amount) => {
  if (!heirList || heirList.length === 0) {
    console.warn("No heirs data to send.");
    return;
  }

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/inheritance-calculator-2",
      {
        heirs: heirList,
        total_amount: total_amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const Calculation = () => {
  const amount = useSelector((state) => state.details.amount);
  const funeralExpenses = useSelector((state) => state.details.funeralExpenses);
  const mehr = useSelector((state) => state.details.mehr);
  const debt = useSelector((state) => state.details.debt);
  const will = useSelector((state) => state.details.will);
  const currency = useSelector((state) => state.details.currency);
  const gender = useSelector((state) => state.options.gender);
  const heirList = useSelector((state) => state.heirs.heirList);
  const [viewToggle, setViewToggle] = useState(0);
  const total_amount = amount - funeralExpenses - mehr - debt - will;

  useEffect(() => {
    if (heirList && heirList.length > 0) {
      sendTestData(heirList, total_amount);
    }
  }, []);

  return (
    <>
      {/* Start */}
      <Heading className="w-[35rem]">Islamic Inheritance Calculator</Heading>
      <div
        id="asset-screen"
        className="bg-white/60 px-4 rounded-xl mt-4 mx-[25%] "
      >
        <Heading className="w-[13rem] text-xl !py-1.5">Asset Details</Heading>
        <div className="mt-4 pb-4">
          {(funeralExpenses !== "" ||
            mehr !== "" ||
            debt !== "" ||
            will !== "") && (
            <DetailsDisplay>
              <span>Total Asset Amount</span>
              <span>
                {currency} {Number(amount).toLocaleString()}
              </span>
            </DetailsDisplay>
          )}
          {funeralExpenses !== "" && (
            <DetailsDisplay className="text-TCR1 text-base">
              <span>Funeral & Burial Expenses</span>
              <span>
                -{currency} {Number(funeralExpenses).toLocaleString()}
              </span>
            </DetailsDisplay>
          )}
          {mehr !== "" && (
            <DetailsDisplay className="text-TCR1 text-base">
              <span>Haq Mehr</span>
              <span>
                -{currency} {Number(mehr).toLocaleString()}
              </span>
            </DetailsDisplay>
          )}
          {debt !== "" && (
            <DetailsDisplay className="text-TCR1 text-base">
              <span>Debt & Liabilities</span>
              <span>
                -{currency} {Number(debt).toLocaleString()}
              </span>
            </DetailsDisplay>
          )}
          {will !== "" && (
            <DetailsDisplay className="text-TCR1 text-base">
              <span>Will</span>
              <span>
                -{currency} {Number(will).toLocaleString()}
              </span>
            </DetailsDisplay>
          )}
          <DetailsDisplay>
            <span>Asset Amount To Be Distributed Among Heirs</span>
            <span>
              {currency} {Number(total_amount).toLocaleString()}
            </span>
          </DetailsDisplay>
        </div>
      </div>
      <div
        id="input-screen"
        className="bg-white/60 p-4 rounded-xl mt-4 mx-[10%]"
      >
        <div className="relative">
          <h1 class="text-3xl font-bold text-TCDG2 text-center mb-4">
            Heir Shares
          </h1>
          <div className="absolute top-0">
            <ViewToggle
              viewToggle={viewToggle}
              setViewToggle={setViewToggle}
            ></ViewToggle>
          </div>
        </div>
        {viewToggle === 0 ? (
          <div class="overflow-x-auto border-2 border-TCT1 rounded-md">
            <table class="min-w-full shadow-lg">
              <thead>
                <tr class="bg-TCLG4 text-TCDG2">
                  <TableHeading>Relation</TableHeading>
                  <TableHeading>Category</TableHeading>
                  <TableHeading>Share</TableHeading>
                  <TableHeading>Amount</TableHeading>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-TCLG">
                  <TableCell>father</TableCell>
                  <TableCell>primary</TableCell>
                  <TableCell>25%</TableCell>
                  <TableCell>$10000</TableCell>
                </tr>
                <tr class="bg-TCLG3">
                  <TableCell>father</TableCell>
                  <TableCell>primary</TableCell>
                  <TableCell>25%</TableCell>
                  <TableCell>$10000</TableCell>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="pl-16 flex w-3/4">
              <PieChartComponent />
            </div>
          </div>
        )}
      </div>
      {console.log(heirList)}
      <ul>
        {heirList.map((heir, index) => (
          <li key={index}>
            <strong>Relation:</strong> {heir.relation} <br />
            <strong>Category:</strong> {heir.category.join(", ")} <br />
            <strong>Limit:</strong> {heir.limit} <br />
            <strong>value:</strong> {heir.val}
          </li>
        ))}
      </ul>
      <div className="w-full h-16"></div>
    </>
  );
};

export default Calculation;
