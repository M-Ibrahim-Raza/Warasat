// This file contains utility functions to generate mock PDF and Excel files for testing

// Generate a mock PDF file
export const generateMockPDF = async (inheritanceData) => {
    return new Promise((resolve) => {
      // In a real app, this would generate a real PDF
      // For testing, we'll just create a blob with some text
      const pdfContent = `
        Islamic Inheritance Calculation
        ------------------------------
        
        Total Asset Amount: ${inheritanceData.currency}${inheritanceData.amount.toLocaleString()}
        Funeral Expenses: ${inheritanceData.currency}${inheritanceData.funeralExpenses.toLocaleString()}
        Mehr: ${inheritanceData.currency}${inheritanceData.mehr.toLocaleString()}
        Debt: ${inheritanceData.currency}${inheritanceData.debt.toLocaleString()}
        Will: ${inheritanceData.currency}${inheritanceData.will.toLocaleString()}
        
        Net Distributable Amount: ${inheritanceData.currency}${(
          inheritanceData.amount -
            inheritanceData.funeralExpenses -
            inheritanceData.mehr -
            inheritanceData.debt -
            inheritanceData.will
        ).toLocaleString()}
        
        Heir Shares:
        ${inheritanceData.heirSharesList
          .map(
            (heir) =>
              `${heir.relation} (${heir.category[1]}): ${inheritanceData.currency}${(heir.amount * heir.val).toLocaleString()}`,
          )
          .join("\n")}
      `
  
      // Create a blob that pretends to be a PDF
      const blob = new Blob([pdfContent], { type: "application/pdf" })
  
      // Resolve with the blob
      setTimeout(() => resolve(blob), 500)
    })
  }
  
  // Generate a mock Excel file
  export const generateMockExcel = async (inheritanceData) => {
    return new Promise((resolve) => {
      // In a real app, this would generate a real Excel file
      // For testing, we'll just create a blob with some text
      const excelContent = `
        Islamic Inheritance Calculation
        ------------------------------
        
        Total Asset Amount,${inheritanceData.currency}${inheritanceData.amount.toLocaleString()}
        Funeral Expenses,${inheritanceData.currency}${inheritanceData.funeralExpenses.toLocaleString()}
        Mehr,${inheritanceData.currency}${inheritanceData.mehr.toLocaleString()}
        Debt,${inheritanceData.currency}${inheritanceData.debt.toLocaleString()}
        Will,${inheritanceData.currency}${inheritanceData.will.toLocaleString()}
        
        Net Distributable Amount,${inheritanceData.currency}${(
          inheritanceData.amount -
            inheritanceData.funeralExpenses -
            inheritanceData.mehr -
            inheritanceData.debt -
            inheritanceData.will
        ).toLocaleString()}
        
        Heir,Category,Share
        ${inheritanceData.heirSharesList
          .map(
            (heir) =>
              `${heir.relation},${heir.category[1]},${inheritanceData.currency}${(heir.amount * heir.val).toLocaleString()}`,
          )
          .join("\n")}
      `
  
      // Create a blob that pretends to be an Excel file
      const blob = new Blob([excelContent], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
  
      // Resolve with the blob
      setTimeout(() => resolve(blob), 500)
    })
  }
  