import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface DetailsState {
  amount: string
  funeralExpenses: string
  mehr: string
  debt: string
  will: string
  currency: string
}

const initialState: DetailsState = {
  amount: "",
  funeralExpenses: "",
  mehr: "",
  debt: "",
  will: "",
  currency: "Rs",
}

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number | string>) => {
      state.amount = action.payload.toString()
    },
    setFuneralExpenses: (state, action: PayloadAction<number | string>) => {
      state.funeralExpenses = action.payload.toString()
    },
    setMehr: (state, action: PayloadAction<number | string>) => {
      state.mehr = action.payload.toString()
    },
    setDebt: (state, action: PayloadAction<number | string>) => {
      state.debt = action.payload.toString()
    },
    setWill: (state, action: PayloadAction<number | string>) => {
      state.will = action.payload.toString()
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload
    },
  },
})

export const { setAmount, setFuneralExpenses, setMehr, setDebt, setWill, setCurrency } = detailsSlice.actions
export default detailsSlice.reducer
