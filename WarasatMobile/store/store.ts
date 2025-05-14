import { configureStore } from "@reduxjs/toolkit"
import detailsReducer from "./detailsSlice"
import optionsReducer from "./optionsSlice"
import heirsReducer from "./heirsSlice"

export const store = configureStore({
  reducer: {
    details: detailsReducer,
    options: optionsReducer,
    heirs: heirsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
