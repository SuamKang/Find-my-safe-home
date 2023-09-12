import { Link, useNavigate, useParams } from "react-router-dom";

import classes from "./BoardItem.module.css";
import { PartialPost } from "../../shared/types";
import { useAppDispatch } from "../../redux/hooks";
import { asyncBoardActions } from "../../redux/actions/board-action";

const BoardItem = ({ post }: { post?: PartialPost }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removePostHandler = () => {
    const dobblecheck = window.confirm("정말 삭제하시겠습니까?");

    if (dobblecheck) {
      dispatch(asyncBoardActions.removePostFB(postId));
      navigate("board");
    }
  };

  return (
    <article>
      <img src={post?.image} alt={post?.title} />
      <h1>{post?.title}</h1>
      <time>{post?.date}</time>
      <p>{post?.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={removePostHandler}>Delete</button>
      </menu>
    </article>
  );
};

export default BoardItem;
