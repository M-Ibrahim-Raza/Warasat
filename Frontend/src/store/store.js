import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "./detailsSlice";

const store = configureStore({
  reducer: {
    details : detailsReducer
  },
});

export default store;
