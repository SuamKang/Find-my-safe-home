import { useNavigate } from "react-router-dom";
import { app, db } from "../../shared/firebase"; // 초기화한 app에서 가져온 DB
import {
  ref,
  set,
  get,
  onValue,
  DataSnapshot,
  remove,
  push,
} from "firebase/database";
import { getAuth } from "firebase/auth";

import { AppDispatch } from "../index";
import { boardActions } from "../slices/board-slice";

import { PostFormData } from "../../shared/types";
// 게시판 노드 이름 => "/board"

const { addPost, editPost, removePost, setPost } = boardActions;

// const dbRef = ref(getDatabase());
// get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

// 전체 게시글 Read
export const getPostsFB = () => {
  return async (dispatch: AppDispatch) => {
    // firebase의 ref와 onValue함수사용
    const postsRef = ref(db, "/posts");

    try {
      // 한번만 데이터 가져오기
      const snapshot = await get(postsRef);

      // 해당 스냅샷 존재하면 그때 데이터 추출
      if (snapshot.exists()) {
        const data = snapshot.val();
        // 데이터 배열로 정제하여 디스패치
        const postsArray = Object.values(data);
        dispatch(setPost(postsArray));
      }
    } catch (error) {
      dispatch(setPost([]));
    }

    // 실시간 업데이트 로직 -> onValue 관찰자 사용
    onValue(postsRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      // console.log(data);

      if (data) {
        // 데이터 배열로 정제하여 디스패치
        const postsArray = Object.values(data);
        dispatch(setPost(postsArray));
      } else {
        // 없으면 초기화
        dispatch(setPost([]));
      }
    });
  };
};

// 특정 게시글 Read
export const getPostFB = (postId: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    const postRef = ref(db, `/posts/${postId}`);

    try {
      const snapshot = await get(postRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const postArray = [data]; // 객체 데이터 배열로 감싸기
        console.log(postArray);
        dispatch(setPost(postArray));
      } else {
        dispatch(setPost([]));
      }
    } catch (error) {
      console.error("해당 게시글 불러오기 오류발생", error);
    }
  };
};

// 게시글 Wirte
export const addPostFB = (newPost: PostFormData) => {
  return async (dispatch: AppDispatch) => {
    // firebase 인증 서비스를 사용해 현재 로그인한 사용자 uid 가져오기
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      console.error("로그인을 해야합니다.");
      const navigate = useNavigate();
      navigate("/login");
      return;
    }

    const { title, image, description, date } = newPost;

    // 데이터페이스 저장
    const postsRef = ref(db, "/posts");
    try {
      const newPostRef = push(postsRef); // database 고유 id생성
      const pid = newPostRef.key; // 새로 생성된 게시글의 고유 id 추출

      await set(newPostRef, {
        userId: user.uid,
        pid,
        title,
        image,
        description,
        date,
      });

      console.log("게시글이 성공적으로 추가되었습니다!");
      // 성공시 리덕스 추가
      dispatch(addPost({ userId: user.uid, pid, ...newPost }));
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
  return async (dispatch: AppDispatch) => {
    const postRef = ref(db, `/posts/${postId}`);

    try {
      // 데이터베이스 데이터 수정
      await set(postRef, updatedPost);
      console.log("해당 게시글 수정 완료!");

      dispatch(editPost(updatedPost));
    } catch (error) {
      console.error("게시글 수정중 오류가 발생하였습니다.", error);
    }
  };
};

// 게시글 Remove
export const removePostFB = (postId: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    const postRef = ref(db, `/posts/${postId}`);

    try {
      // 데이터베이스안의 postId에 해당하는 데이터 삭제
      await remove(postRef);
      console.log("해당 게시글 삭제 완료!");

      // 리듀서에 payload로 id를 전달했기에 해당 id를 제외한 나머지 게시글 배열로 정제 해주어야함
      dispatch(removePost(postId));
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

// 게시판 데이터 realtime database에서 불러올때 생긴 에러 및 해결
// 새로운 게시글을 작성후 불러올때 작성된 데이터가 매우 많이 불러와지며 아래와 같은 에러가 발생했다.
// Uncaught Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.

// 찾아본결과, 이렇게 데이터가 엄청 많이 담겨져 나오는 문제는 firebase realtime database의 동작 방식에 기인되어있어서 그렇다고 볼수 있었다.
// realtime database는 모든데이터에 대한 변경 방식이 "실시간"으로 수신하기 때문에, 데이터가 변경될때마다 해당 데이터의 스냅샷을 받게되고, 이로 인해 내가 적용했던 "onValue"콜백함수가 여러번 호출되어 데이터가 계속 누적되는 문제가.. 발생한것!

// 이를 해결하기위해 파이어베이스에서 제공하는 'get' 메소드를 사용해 데이터를 한번만 가져오고 'onValue'메서드로 실시간 업데이트를 수신하는 방법으로 수정했다.

// getPostsFB 수정코드

// 즉 정리하면, 초기 한번의 데이터 가져오기는 'get'메서드로 수행하고, 그 후엔 'onValue'메서드를 사용하여 실시간 업데이트를 진행한다.