import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Heir {
  relation: string
  val: number
  limit: number
}

interface HeirsState {
  heirList: Heir[]
}

const initialState: HeirsState = {
  heirList: [],
}

const heirsSlice = createSlice({
  name: "heirs",
  initialState,
  reducers: {
    updateHeirList: (state, action: PayloadAction<Heir>) => {
      const heirIndex = state.heirList.findIndex((heir) => heir.relation === action.payload.relation)
      if (heirIndex !== -1) {
        if (state.heirList[heirIndex].val < state.heirList[heirIndex].limit) {
          state.heirList[heirIndex].val += 1
        }
      } else {
        state.heirList.push({ ...action.payload })
      }
    },
    decrementHeirVal: (state, action: PayloadAction<Heir>) => {
      const heirIndex = state.heirList.findIndex((heir) => heir.relation === action.payload.relation)
      if (heirIndex !== -1 && state.heirList[heirIndex].val > 1) {
        state.heirList[heirIndex].val -= 1
      }
    },
    deleteHeir: (state, action: PayloadAction<Heir>) => {
      state.heirList = state.heirList.filter((heir) => heir.relation !== action.payload.relation)
    },
  },
})

export const { updateHeirList, decrementHeirVal, deleteHeir } = heirsSlice.actions
export default heirsSlice.reducer
