import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "./slices/auth-slice";

// 전역으로 관리되어야할 상태 생각해보자
// user의 인증상태, 게시판 데이터 상태, 전역화면 UI상태

const store = configureStore({
  reducer: {
    auth: authReducer,
    // board: boardSlice.reducer,
  },
});

export default store;

// RootState과 Dispatch, thunk함수 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
