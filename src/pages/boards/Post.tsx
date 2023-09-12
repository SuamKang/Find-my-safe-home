import { useParams } from "react-router-dom";
import BoardItem from "../../components/board/BoardItem";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { asyncBoardActions } from "../../redux/actions/board-action";

// 상세게시글 페이지
const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    state.board.posts.find((post) => post?.pid === postId)
  );

  useEffect(() => {
    dispatch(asyncBoardActions.getPostFB(postId));
  }, [postId]);

  return <BoardItem post={post} />;
};

export default PostPage;
