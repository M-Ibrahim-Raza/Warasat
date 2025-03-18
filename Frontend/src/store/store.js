import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "./detailsSlice";
import optionsReducer from "./optionsSlice";
import heirsReducer from "./heirsSlice";

const store = configureStore({
  reducer: {
    details: detailsReducer,
    options: optionsReducer,
    heirs: heirsReducer,
  },
});

export default store;
