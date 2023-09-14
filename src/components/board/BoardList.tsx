import { Link } from "react-router-dom";

import classes from "./BoardList.module.css";
import { PostProps } from "../../shared/types";

const BoardList = ({ posts }: { posts: PostProps[] }) => {
  return (
    <div className={classes.board__wrap}>
      <h1>자유롭게 이야기 하세요!</h1>
      <ul className={classes.board__list}>
        {posts.map((post, idx) => (
          <li key={idx} className={classes.board__item}>
            <Link to={`${post.pid}`}>
              <img src={post.image} alt={post.title} />
              <div className={classes.content}>
                <h2>{post.title}</h2>
                <time>{post.date}</time>
                <p>{post.userId}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
