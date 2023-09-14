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
    // addPost(state, action: PayloadAction<PostProps>) {
    //   // 새로운 게시글(객체)데이터를 기존 데이터와 병합
    //   state.posts = [...state.posts, action.payload];
    // },
    // editPost(state, action) {
    //   const updatePostIndex = state.posts.findIndex(
    //     (post) => post.pid === action.payload.pid
    //   );
    //   if (updatePostIndex !== -1) {
    //     state.posts[updatePostIndex] = action.payload;
    //   }
    // },
    // removePost(state, action) {
    //   state.posts = state.posts.filter((post) => post.pid !== action.payload);
    // },
    setPost(state, action) {
      // 새로 받은 데이터 배열을 기존 스토어 데이터와 병합
      state.posts = action.payload;
    },
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;

// 따라서 엑션생성자함수(thunk)로 부터 전달받은 action.payload는 post객체 하나를 받는것이기에 reducer에서 각 메서드에 맞는 함수 안에 받아온(새로운post, 업데이트된 post, 삭제할 post 등등)객체 값을 배열에 push하도록 전부 조정해주어야 한다.
// 내가 게시판의 posts를 저장하는건 배열이며 해당 배열안에 여러가지 객체형태를 가진 post가 저장되는 구조로 구성했다.
