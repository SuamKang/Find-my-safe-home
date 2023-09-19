import { createSlice } from "@reduxjs/toolkit";

export interface checkDetailDataType {
  text: string;
  done: boolean;
}

export interface checkDataType extends checkDetailDataType {
  cid: string;
}

export interface CheckType {
  checks: checkDataType[];
}

const initialState: CheckType = {
  checks: [],
};

export const checkSlice = createSlice({
  name: "check",
  initialState,
  reducers: {
    // addCheck(state,action) {
    //   state.todos = [...state.todos, action.payload]
    // },
    // removeCheck(state,action) {

    // },
    // editCheck(state,action) {

    // },
    setCheck(state, action) {
      state.checks = action.payload;
    },
  },
});

export const checkActions = checkSlice.actions;

export default checkSlice.reducer;
