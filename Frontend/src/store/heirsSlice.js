import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heirList: [],
  heirSharesList:[]
};

const heirsSlice = createSlice({
  name: "heirs",
  initialState,
  reducers: {

    updateHeirSharesList : (state,action)=>{
      state.heirSharesList = action.payload
    },

    updateHeirList: (state, action) => {
      const heir = action.payload;
      const exists = state.heirList.some((h) => h.relation === heir.relation);

      if (exists) {
        if (heir.limit === 1) {
          return;
        }
        state.heirList = state.heirList.map((h) =>
          h.relation === heir.relation ? { ...h, val: h.val + 1 } : h
        );
      } else {
        state.heirList.push({ ...heir, val: 1 });
      }
    },

    deleteHeir: (state, action) => {
      state.heirList = state.heirList.filter(
        (h) => h.relation !== action.payload.relation
      );
    },

    decrementHeirVal: (state, action) => {
      console.log("In Hier");
      state.heirList = state.heirList.map((h) =>
        h.relation === action.payload.relation ? { ...h, val: h.val - 1 } : h
      );
    },
  },
});

export const { updateHeirSharesList ,updateHeirList, deleteHeir, decrementHeirVal } =
  heirsSlice.actions;
export default heirsSlice.reducer;
