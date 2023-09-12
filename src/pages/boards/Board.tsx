import { useEffect } from "react";
import BoardList from "../../components/board/BoardList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { asyncBoardActions } from "../../redux/actions/board-action";

const BoardPage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.board.posts);

  useEffect(() => {
    dispatch(asyncBoardActions.getPostsFB());
  }, []);

  return <BoardList posts={posts} />;
};

export default BoardPage;

// loader
// async function loadPosts() {
//   const response = await fetch(
//     "https://find-my-safe-home-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
//   );

//   if (!response.ok) {
//     return json(
//       { message: "게시글을 제대로 불러오지 못했습니다." },
//       { status: 500 }
//     );
//   }

//   const resData = await response.json(); // 수동 파싱
//   console.log(resData.posts);
//   return resData.posts;
// }

// // 게시판 게시글 불러오는 로더 함수 생성 -> defer를 이용해 비동기 처리 유연성 향상
// export function loader() {
//   return defer({
//     posts: loadPosts(), // defer가 리턴하는 객체는 프로미스다.
//   });
// }
