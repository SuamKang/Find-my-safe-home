import { Link, useNavigate, useParams } from "react-router-dom";

import { PartialPost } from "../../shared/types";
import { useAppDispatch } from "../../redux/hooks";
import { asyncBoardActions } from "../../redux/actions/board-action";

import classes from "./BoardItem.module.css";

const BoardItem = ({ post }: { post?: PartialPost }) => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removePostHandler = () => {
    const dobblecheck = window.confirm("정말 삭제하시겠습니까?");

    if (dobblecheck) {
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
        <Link to="edit-post">수정</Link>
        <div id="button" onClick={removePostHandler}>
          삭제
        </div>
      </menu>
    </article>
  );
};

export default BoardItem;
