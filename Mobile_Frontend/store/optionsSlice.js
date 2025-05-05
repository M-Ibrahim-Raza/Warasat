// src/store/optionsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  distributionMethod: "amount",
  gender: "male",
  funeralExpenses: false,
  mehr: false,
  debt: false,
  will: true
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setDistributionMethod: (state, action) => {
      state.distributionMethod = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    toggleFuneralExpenses: (state) => {
      state.funeralExpenses = !state.funeralExpenses;
    },
    toggleMehr: (state) => {
      state.mehr = !state.mehr;
    },
    toggleDebt: (state) => {
      state.debt = !state.debt;
    },
    toggleWill: (state) => {
      state.will = !state.will;
    },
  },
});

export const {
  setDistributionMethod,
  setGender,
  toggleFuneralExpenses,
  toggleMehr,
  toggleDebt,
  toggleWill
} = optionsSlice.actions;

export default optionsSlice.reducer;