import { app, db } from "../../shared/firebase"; // 초기화한 app에서 가져온 DB
import { ref, set, get, remove, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

import { AppDispatch } from "../index";
import { boardActions } from "../slices/board-slice";

import { PostFormData } from "../../shared/types";

const { setPost } = boardActions;

// Firebase Realtime Database에 대한 리스너 설정
const setupFBListeners = (dispatch: AppDispatch) => {
  const postsRef = ref(db, "/posts");

  // 게시글 변경 이벤트
  onValue(postsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const postsArray = Object.values(data);
      dispatch(setPost(postsArray));
    } else {
      dispatch(setPost([]));
    }
  });
};

// 전체 게시글 Read
export const getPostsFB = () => {
  return async (dispatch: AppDispatch) => {
    // Firebase Realtime Database 리스너 설정
    setupFBListeners(dispatch);
  };
};

// 특정 게시글 Read
export const getPostFB = (postId: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    const postRef = ref(db, `/posts/${postId}`);

    try {
      // 한번만 데이터 가져오기
      const snapshot = await get(postRef);

      // 해당 스냅샷 존재하면 그때 데이터 추출
      if (snapshot.exists()) {
        const data = snapshot.val();
        // postArray에 담기는 단건 게시글 데이터가 고유의 id가 포함되도록 설정해야한다.
        const postArray = [{ ...data, pid: postId }];
        dispatch(setPost(postArray));
      }
    } catch (error) {
      dispatch(setPost([]));
    }
  };
};

// 게시글 Wirte
export const addPostFB = (newPost: PostFormData) => {
  return async () => {
    // firebase 인증 서비스를 사용해 현재 로그인한 사용자 uid 가져오기
    const auth = getAuth(app);
    const user = auth.currentUser;
    const postsRef = ref(db, "/posts");

    const { title, image, description, date } = newPost;

    try {
      const newPostRef = push(postsRef); // database 고유 id생성
      const pid = newPostRef.key; // 새로 생성된 게시글의 고유 id 추출

      // 데이터페이스 저장
      await set(newPostRef, {
        userId: user?.uid,
        userName: user?.displayName,
        pid,
        title,
        image,
        description,
        date,
      });

      console.log("게시글이 성공적으로 추가되었습니다!");
    } catch (error) {
      console.error("게시글 추가중 오류가 발생하였습니다.", error);
    }
  };
};

// 게시글 Edit
export const editPostFB = (
  postId: string | undefined,
  updatedPost: Partial<PostFormData>
) => {
  return async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    const { title, image, description, date } = updatedPost;

    const postRef = ref(db, `/posts/${postId}`);

    try {
      // 해당 게시글 고유 id 다시 가져와서 게시글 생성과 같은 필드로 유지시키기
      const pid = postRef.key;
      // 데이터베이스 데이터 수정
      await set(postRef, {
        userId: user?.uid,
        userName: user?.displayName,
        pid,
        title,
        image,
        description,
        date,
      });
      console.log("게시글이 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("게시글 수정중 오류가 발생하였습니다.", error);
    }
  };
};

// 게시글 Remove
export const removePostFB = (postId: string | undefined) => {
  return async () => {
    const postRef = ref(db, `/posts/${postId}`);

    try {
      // 데이터베이스안의 postId에 해당하는 데이터 삭제
      await remove(postRef);
      console.log("게시글이 성공적으로 삭제되었습니다!");
    } catch (error) {
      console.error("게시글 삭제 중 오류가 발생하였습니다.", error);
    }
  };
};

// 비동기 엑션들 출력
export const asyncBoardActions = {
  getPostsFB,
  getPostFB,
  addPostFB,
  editPostFB,
  removePostFB,
};
