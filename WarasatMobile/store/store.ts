import { configureStore } from "@reduxjs/toolkit"
import detailsReducer from "./detailsSlice"
import optionsReducer from "./optionsSlice"

export const store = configureStore({
  reducer: {
    details: detailsReducer,
    options: optionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
