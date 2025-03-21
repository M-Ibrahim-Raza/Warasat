import React from "react";
import Heading from "../../Components/Heading";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateHeirSharesList } from "@/store/heirsSlice";
import { calculatePercentage, formatNumber } from "@/Utilities/utilities";
import DetailsDisplay from "../../Components/DetailsDisplay";
import TableHeading from "@/../Components/Table/TableHeading";
import TableCell from "@/../Components/Table/TableCell";
import ViewToggle from "@/../Components/ViewToggle";
import PieChartComponent from "@/../Components/PieChartComponent";
import axios from "axios";
import { useEffect } from "react";
import Button from "@/../Components/Button";

const handleDownloadPDF = async (
  amount,
  funeralExpenses,
  mehr,
  debt,
  will,
  currency,
  gender,
  heirSharesList
) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/inheritance-calculation-pdf",
      {
        total_amount: amount,
        funeral_expenses: funeralExpenses,
        mehr: mehr,
        debt: debt,
        will: will,
        currency: currency,
        gender: gender,
        heir_list: heirSharesList,
      }
    );

    console.log("✅ PDF Generation Request Sent:", response.data);
    alert("PDF generation request sent successfully!"); // Display success message
  } catch (error) {
    console.error("❌ Error:", error);
    alert("Failed to generate PDF. Check the console for details.");
  }
};

const sendTestData = async (heirList, total_amount, dispatch) => {
  if (!heirList || heirList.length === 0) {
    console.warn("No heirs data to send.");
    return;
  }

  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/inheritance-calculator-2",
      {
        heir_list: heirList,
        total_amount: total_amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API Response:", response.data);

    if (response.data && response.data.heir_list) {
      dispatch(updateHeirSharesList(response.data.heir_list));
    }
  } catch (error) {
    console.error("Error:", error);
    dispatch(updateHeirSharesList([]));
  }
};

const Calculation = () => {
  const dispatch = useDispatch();

  const amount = useSelector((state) => state.details.amount);
  const funeralExpenses = useSelector((state) => state.details.funeralExpenses);
  const mehr = useSelector((state) => state.details.mehr);
  const debt = useSelector((state) => state.details.debt);
  const will = useSelector((state) => state.details.will);
  const currency = useSelector((state) => state.details.currency);
  const gender = useSelector((state) => state.options.gender);
  const heirList = useSelector((state) => state.heirs.heirList);
  const heirSharesList = useSelector((state) => state.heirs.heirSharesList);
  const [viewToggle, setViewToggle] = useState(0);
  const total_amount = amount - funeralExpenses - mehr - debt - will;

  useEffect(() => {
    if (heirList && heirList.length > 0) {
      sendTestData(heirList, total_amount, dispatch);
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
          <div
            className="absolute top-0 right-0"
            onClick={() => {
              handleDownloadPDF(
                amount,
                funeralExpenses,
                mehr,
                debt,
                will,
                currency,
                gender,
                heirSharesList
              );
            }}
          >
            <Button className="!py-1 !text-md !mx-0" onClick>
              Print PDF
            </Button>
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
                {heirSharesList.map((heir, index) => {
                  let display_count = heir.val > 1 ? ` × ${heir.val}` : "";
                  let amount_display_count =
                    heir.val > 1
                      ? ` × ${heir.val} = ${formatNumber(
                          heir.val * heir.amount
                        )}`
                      : "";
                  let percentage_display_count =
                    heir.val > 1
                      ? ` × ${heir.val} = ${calculatePercentage(
                          heir.val * heir.amount,
                          total_amount
                        )} %`
                      : "";

                  return (
                    <tr key={index} className="bg-TCLG-1">
                      <TableCell>{heir.relation + display_count}</TableCell>
                      <TableCell>{heir.category[1]}</TableCell>
                      <TableCell>
                        {calculatePercentage(heir.amount, total_amount) +
                          " %" +
                          percentage_display_count}
                      </TableCell>
                      <TableCell>
                        {currency +
                          " " +
                          formatNumber(heir.amount) +
                          amount_display_count}
                      </TableCell>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="pl-16 flex w-3/4">
              <PieChartComponent
                heirSharesList={heirSharesList}
                total_amount={total_amount}
                currency={currency}
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-16"></div>
    </>
  );
};

export default Calculation;
