// src/store/detailsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: "",
  funeralExpenses: "",
  mehr: "",
  debt: "",
  will: "",
  currency: "Rs"
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setFuneralExpenses: (state, action) => {
      state.funeralExpenses = action.payload;
    },
    setMehr: (state, action) => {
      state.mehr = action.payload;
    },
    setDebt: (state, action) => {
      state.debt = action.payload;
    },
    setWill: (state, action) => {
      state.will = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { 
  setAmount, 
  setFuneralExpenses, 
  setMehr, 
  setDebt, 
  setWill, 
  setCurrency 
} = detailsSlice.actions;

export default detailsSlice.reducer;