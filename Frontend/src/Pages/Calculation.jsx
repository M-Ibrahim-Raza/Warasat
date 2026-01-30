import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/config/api";
import { useAuth } from "@/context/AuthContext";

import { updateHeirSharesList } from "@/store/heirsSlice";
import { calculatePercentage, formatNumber, treeDataTransformer } from "@/Utilities/utilities";

import DownloadDropdown from "@/../Components/DownloadDropdown";
import DetailsDisplay from "../../Components/DetailsDisplay";
import Heading from "../../Components/Heading";
import PieChartComponent from "@/../Components/PieChartComponent";
import TableCell from "@/../Components/Table/TableCell";
import TableHeading from "@/../Components/Table/TableHeading";
import Tree from "@/../Components/Tree/Tree";
import ViewToggle from "@/../Components/ViewToggle";
import ViewToggle3Options from "@/../Components/ViewToggle3Options";

let treeData = null

// Handler Function to Handle Download Excel Request
const handleDownloadExcel = async (
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
      API_ENDPOINTS.EXCEL_REPORT,
      {
        total_amount: amount,
        funeral_expenses: funeralExpenses,
        mehr: mehr,
        debt: debt,
        will: will,
        currency: currency,
        gender: gender,
        heir_list: heirSharesList,
      },
      { responseType: "blob" } // Important: Receive Excel as blob
    );

    console.log("✅ Excel Generation Request Sent Successfully");

    // Create a downloadable link
    const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Inheritance-Calculation.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Cleanup

    alert("Excel downloaded successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    alert("Failed to generate Excel file. Check the console for details.");
  }
};

// Handler Function to Handle Download PDF Request
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
      API_ENDPOINTS.PDF_REPORT,
      {
        total_amount: amount,
        funeral_expenses: funeralExpenses,
        mehr: mehr,
        debt: debt,
        will: will,
        currency: currency,
        gender: gender,
        heir_list: heirSharesList,
      },
      { responseType: "blob" } // Important: Receive PDF as blob
    );

    console.log("✅ PDF Generation Request Sent Successfully");

    // Create a downloadable link
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Inheritance-Calculation.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Cleanup

    alert("PDF downloaded successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    alert("Failed to generate PDF. Check the console for details.");
  }
};

const handleRequestCalculation = async (heirList, total_amount, dispatch) => {
  if (!heirList || heirList.length === 0) {
    console.warn("No heirs data to send.");
    return;
  }

  try {
    const response = await axios.post(
      API_ENDPOINTS.INHERITANCE_CALCULATOR,
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
    treeData = treeDataTransformer(response.data.heir_list, total_amount)

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
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const distributionMethod=useSelector((state)=>state.options.distributionMethod)
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
  let is_tree_visible = true

  useEffect(() => {
    if (heirList && heirList.length > 0) {
      handleRequestCalculation(heirList, total_amount, dispatch);
    }
  }, []);

  // Handle Consult Ulema - store inheritance data and navigate
  const handleConsultUlema = () => {
    // Store the inheritance calculation results for sharing with Ulema
    const inheritanceData = {
      total_amount: amount,
      distributable_amount: total_amount,
      funeral_expenses: funeralExpenses,
      mehr: mehr,
      debt: debt,
      will: will,
      currency: currency,
      gender: gender,
      heir_shares: heirSharesList.map(heir => ({
        relation: heir.relation,
        category: heir.category,
        count: heir.val,
        amount: heir.amount,
        percentage: ((heir.amount / total_amount) * 100).toFixed(2)
      }))
    };
    
    // Store in localStorage for sharing with Ulema
    localStorage.setItem("inheritance_result", JSON.stringify(inheritanceData));
    localStorage.setItem("share_inheritance", "true"); // Flag to indicate we should share
    
    // Navigate to ulema selection or login
    if (isAuthenticated()) {
      navigate("/consult-ulema");
    } else {
      // Store return URL and redirect to login
      localStorage.setItem("redirect_after_login", "/consult-ulema");
      navigate("/login");
    }
  };

  return (
    <>
      {/* Start */}
      <Heading className="w-[35rem]">Islamic Inheritance Calculator</Heading>


      {/* Asset Details */}
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
                {distributionMethod==='amount'
                ?
                <span>
                  {currency} {Number(amount).toLocaleString()}
                </span>
                :
                <span>
                {`${Number(amount).toLocaleString()} %`}
                </span>
                }
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
            distributionMethod === "amount" ?
              <DetailsDisplay className="text-TCR1 text-base">
                <span>Will</span>
                <span>
                  -{currency} {Number(will).toLocaleString()}
                </span>
              </DetailsDisplay> :
              <DetailsDisplay className="text-TCR1 text-base">
                <span>Will</span>
                <span>
                  {`${Number(will)} %`}
                </span>
              </DetailsDisplay>
          )}
          <DetailsDisplay>
            <span>Asset Amount To Be Distributed Among Heirs</span>
              {distributionMethod==="amount"?
            <span>
                {currency} {Number(total_amount).toLocaleString()}
              </span>
              :
              <span>
{`${Number(total_amount).toLocaleString()} %`}
              </span>
              }
              
          </DetailsDisplay>
        </div>
      </div>

      {/* Shares Screen */}
      <div
        id="shares-screen"
        className="bg-white/60 p-4 rounded-xl mt-4 mx-[10%]"
      >

        {/* Header Options */}
        <div className="relative">
          <h1 className="text-3xl font-bold text-TCDG2 text-center mb-4">
            Heir Shares
          </h1>
          <div className="absolute top-0">
            {is_tree_visible ? <ViewToggle3Options viewToggle={viewToggle}
              setViewToggle={setViewToggle}></ViewToggle3Options> : <ViewToggle
                viewToggle={viewToggle}
                setViewToggle={setViewToggle}
              ></ViewToggle>}
          </div>
          <div className="absolute top-0 right-0">
            <DownloadDropdown onExcelClick={() => {
              handleDownloadExcel(
                amount,
                funeralExpenses,
                mehr,
                debt,
                will,
                currency,
                gender,
                heirSharesList
              );
            }} onPdfClick={() => {
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
            }}></DownloadDropdown>
          </div>
        </div>

        {/* Shares Distribution Display */}
        
        {viewToggle === 0 ? (
          // Table Display
          <div className="overflow-x-auto border-2 border-TCT1 rounded-md">
            <table className="min-w-full shadow-lg">
              <thead>
                <tr className="bg-TCLG4 text-TCDG2">
                  <TableHeading>Relation</TableHeading>
                  <TableHeading>Category</TableHeading>
                  <TableHeading>Share</TableHeading>
                  {distributionMethod==="amount"&&<TableHeading>Amount</TableHeading>
}
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
                          {distributionMethod === "amount"&& <TableCell>
                        {currency +
                          " " +
                          formatNumber(heir.amount) +
                          amount_display_count}
                      </TableCell>
                }
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
         : viewToggle === 1 ? 
         (
          // Piechart Display
          <div className="flex justify-center">
            <div className="pl-16 flex w-3/4">
              <PieChartComponent
                heirSharesList={heirSharesList}
                total_amount={total_amount}
                currency={currency}
                />
            </div>
          </div>
        ) :
        // Tree Display
              // <div className="flex justify-center">
              //   <div className="pl-16 flex w-3/4 relative">
              //   <div className="absolute border-2 border-black">
              <Tree childrenData={treeData['children']} parentsData={treeData['parents']} siblingsData={treeData['siblings']} spouseData={treeData['spouse']}></Tree>
            //     </div>
            //   </div>
            // </div>
        }
      </div>

      {/* Consult Ulema Section */}
      {heirSharesList && heirSharesList.length > 0 && (
        <div className="bg-white/60 p-6 rounded-xl mt-4 mx-[10%] text-center">
          <h3 className="text-xl font-semibold text-TCDG2 mb-3">
            Need Expert Verification?
          </h3>
          <p className="text-gray-600 mb-4">
            Consult with our certified Ulema to verify your inheritance calculation
          </p>
          <button
            onClick={handleConsultUlema}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Consult Ulema
          </button>
        </div>
      )}

      <div className="w-full h-28"></div>
    </>
  );
};

export default Calculation;
