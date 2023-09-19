import { Link, useNavigate, useParams } from "react-router-dom";

import { PartialPost } from "../../shared/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { asyncBoardActions } from "../../redux/actions/board-action";

import classes from "./BoardItem.module.css";

const BoardItem = ({ post }: { post?: PartialPost }) => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 작성자만 본인 게시글 삭제 가능하도록 제한설정
  const isRightUser = useAppSelector(
    (state) => state.auth.user?.uid === post?.userId
  );

  const removePostHandler = () => {
    const dobblecheck = window.confirm("정말 삭제하시겠습니까?");

    if (!isRightUser) {
      alert("해당 게시글은 작성자만이 삭제 가능합니다!");
    }

    if (dobblecheck && isRightUser) {
      dispatch(asyncBoardActions.removePostFB(postId));
      navigate("/board");
    }
  };

  return (
    <article className={classes.post}>
      <h1>{post?.title}</h1>
      <div className={classes.post__content}>
        <img src={post?.image} alt={post?.title} />
        <time>{post?.date}</time>
        <p>{post?.description}</p>
      </div>
      <menu className={classes.post__actions}>
        {isRightUser && (
          <>
            <Link to="edit-post">수정</Link>
            <div id="button" onClick={removePostHandler}>
              삭제
            </div>
          </>
        )}
      </menu>
    </article>
  );
};

export default BoardItem;
