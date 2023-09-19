import { createSlice } from "@reduxjs/toolkit";
import { BoardTypes } from "../../shared/types";

const initialState: BoardTypes = {
  posts: [],
  status: "idle",
  error: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setPost(state, action) {
      // 새로 받은 데이터 배열을 기존 스토어 데이터와 병합
      state.posts = action.payload;
    },
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
