import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface OptionsState {
  distributionMethod: string
  gender: string
  funeralExpenses: boolean
  mehr: boolean
  debt: boolean
  will: boolean
}

const initialState: OptionsState = {
  distributionMethod: "amount",
  gender: "male",
  funeralExpenses: false,
  mehr: false,
  debt: false,
  will: false,
}

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setDistributionMethod: (state, action: PayloadAction<string>) => {
      state.distributionMethod = action.payload
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload
    },
    toggleFuneralExpenses: (state) => {
      state.funeralExpenses = !state.funeralExpenses
    },
    toggleMehr: (state) => {
      state.mehr = !state.mehr
    },
    toggleDebt: (state) => {
      state.debt = !state.debt
    },
    toggleWill: (state) => {
      state.will = !state.will
    },
  },
})

export const { setDistributionMethod, setGender, toggleFuneralExpenses, toggleMehr, toggleDebt, toggleWill } =
  optionsSlice.actions
export default optionsSlice.reducer
