import { createSlice } from "@reduxjs/toolkit";

import { CheckType } from "../../shared/types";

const initialState: CheckType = {
  checks: [],
};

export const checkSlice = createSlice({
  name: "check",
  initialState,
  reducers: {
    setCheck(state, action) {
      state.checks = action.payload;
    },
  },
});

export const checkActions = checkSlice.actions;

export default checkSlice.reducer;
