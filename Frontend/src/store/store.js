import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "./detailsSlice";
import optionsReducer from "./optionsSlice";

const store = configureStore({
  reducer: {
    details : detailsReducer,
    options : optionsReducer
  },
});

export default store;
