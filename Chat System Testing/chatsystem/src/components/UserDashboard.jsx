"use client"

import { useState, useEffect } from "react"
import UlemaList from "./UlemaList"
import ChatInterface from "./ChatInterface"
import { generateMockPDF, generateMockExcel } from "../utils/mockFileGenerator"

const UserDashboard = ({ username }) => {
  const [selectedUlema, setSelectedUlema] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const [excelFile, setExcelFile] = useState(null)
  const [inheritanceData, setInheritanceData] = useState(null)
  const [isGeneratingFiles, setIsGeneratingFiles] = useState(false)

  // Generate mock inheritance data
  useEffect(() => {
    const mockData = {
      amount: 1000000,
      funeralExpenses: 10000,
      mehr: 20000,
      debt: 50000,
      will: 100000,
      currency: "$",
      gender: "male",
      heirSharesList: [
        {
          relation: "Wife",
          category: ["Quranic", "Spouse"],
          amount: 102500,
          val: 1,
        },
        {
          relation: "Son",
          category: ["Residuary", "Son"],
          amount: 410000,
          val: 2,
        },
        {
          relation: "Daughter",
          category: ["Residuary", "Daughter"],
          amount: 205000,
          val: 1,
        },
      ],
    }
    setInheritanceData(mockData)
  }, [])

  const handleSelectUlema = async (ulema) => {
    setIsGeneratingFiles(true)

    try {
      // Generate mock PDF and Excel files
      const pdfBlob = await generateMockPDF(inheritanceData)
      const excelBlob = await generateMockExcel(inheritanceData)

      setPdfFile(pdfBlob)
      setExcelFile(excelBlob)
      setSelectedUlema(ulema)
    } catch (error) {
      console.error("Error generating files:", error)
      alert("Failed to generate files. Please try again.")
    } finally {
      setIsGeneratingFiles(false)
    }
  }

  const handleCloseChat = () => {
    setSelectedUlema(null)
  }

  return (
    <div className="mt-6">
      {isGeneratingFiles ? (
        <div className="text-center p-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
          <p className="text-lg">Generating inheritance documents...</p>
        </div>
      ) : selectedUlema ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-green-50 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Chat with {selectedUlema.name}</h2>
            <button onClick={handleCloseChat} className="text-gray-600 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ChatInterface
            ulema={selectedUlema}
            onClose={handleCloseChat}
            pdfFile={pdfFile}
            excelFile={excelFile}
            inheritanceData={inheritanceData}
            username={username}
          />
        </div>
      ) : (
        <div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-4 bg-green-50 border-b">
              <h2 className="text-xl font-bold text-gray-800">Your Inheritance Summary</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">Asset Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Asset Amount:</span>
                      <span className="font-medium">${inheritanceData?.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>Funeral & Burial Expenses:</span>
                      <span>-${inheritanceData?.funeralExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>Haq Mehr:</span>
                      <span>-${inheritanceData?.mehr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>Debt & Liabilities:</span>
                      <span>-${inheritanceData?.debt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>Will:</span>
                      <span>-${inheritanceData?.will.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Amount To Be Distributed:</span>
                      <span>
                        $
                        {(
                          inheritanceData?.amount -
                          inheritanceData?.funeralExpenses -
                          inheritanceData?.mehr -
                          inheritanceData?.debt -
                          inheritanceData?.will
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">Heir Shares</h3>
                  <div className="space-y-2">
                    {inheritanceData?.heirSharesList.map((heir, index) => (
                      <div key={index} className="flex justify-between">
                        <span>
                          {heir.relation} {heir.val > 1 ? `× ${heir.val}` : ""}
                        </span>
                        <span className="font-medium">${(heir.amount * heir.val).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-2">
                  To verify this calculation with an Islamic scholar, please select an Ulema below.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-green-50 border-b">
              <h2 className="text-xl font-bold text-gray-800">Available Islamic Scholars (Ulema)</h2>
            </div>
            <UlemaList onSelectUlema={handleSelectUlema} />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDashboard
