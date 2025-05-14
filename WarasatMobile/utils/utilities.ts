export const capitalizeWords = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }
  
  export const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }
  
  export const calculatePercentage = (amount: number, total: number) => {
    if (total === 0) return "0.00"
    return ((amount / total) * 100).toFixed(2)
  }
  