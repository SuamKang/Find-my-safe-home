import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardTypes, PostProps } from "../../shared/types";

const initialState: BoardTypes = {
  posts: [],
  status: "idle",
  error: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<PostProps>) {
      state.posts.push(action.payload);
    },
    editPost(state, action) {
      // action.payload에는 수정된 게시글로 배열을 대체
      state.posts = action.payload;
    },
    removePost(state, action) {
      // action.payload에는 삭제된 게시글을 제외한 게시글 목록으로 대체
      state.posts = action.payload;
    },
    setPost(state, action) {
      state.posts = action.payload;
    },
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;

// 따라서 엑션생성자함수(thunk)로 부터 전달받은 action.payload는 post객체 하나를 받는것이기에 reducer에서 각 메서드에 맞는 함수 안에 받아온(새로운post, 업데이트된 post, 삭제할 post 등등)객체 값을 배열에 push하도록 전부 조정해주어야 한다.
// 내가 게시판의 posts를 저장하는건 배열이며 해당 배열안에 여러가지 객체형태를 가진 post가 저장되는 구조로 구성했다.
