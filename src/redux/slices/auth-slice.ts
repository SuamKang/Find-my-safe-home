import { createSlice } from "@reduxjs/toolkit";

export interface UserType {
  uid: string;
  email: string;
  password: string;
  userName: string;
  user_profile: string;
}

export interface AuthType {
  user: UserType | null;
  isLogin: boolean;
}

const initialState: AuthType = {
  user: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout(state) {
      state.user = null;
      state.isLogin = false;
    },
  },
});

// 동기적으로 작동하는 리듀서의 엑션
export const authActions = authSlice.actions;

export default authSlice.reducer;
