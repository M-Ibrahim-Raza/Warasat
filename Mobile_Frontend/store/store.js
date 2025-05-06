// src/store/store.js
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
  // Add middleware configuration for React Native if needed
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in React Native environment
        ignoredActions: ['FLUSH', 'REHYDRATE', 'PAUSE', 'PERSIST', 'PURGE', 'REGISTER'],
      },
    }),
});

export default store;