import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import BoardItem from "../../components/board/BoardItem";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { asyncBoardActions } from "../../redux/actions/board-action";

// 상세게시글 페이지
const PostPage = () => {
  const { pathname } = useLocation();
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    state.board.posts.find((post) => post?.pid === postId)
  );

  useEffect(() => {
    // 게시글 데이터를 불러오는 비동기 액션을 호출
    dispatch(asyncBoardActions.getPostFB(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return <BoardItem post={post} />;
};

export default PostPage;
