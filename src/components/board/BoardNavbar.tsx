import { Link } from "react-router-dom";
import classes from "./BoardNavbar.module.css";

const BoardNavbar = () => {
  return (
    <div className={classes.nav__inner}>
      <h2>
        Community Board <em>자유 게시판</em>
      </h2>
      <nav>
        <ul className={classes.nav__list}>
          <li>
            <Link to="/board">전체보기</Link>
          </li>
          <li>
            <Link to="/board/new-post">글쓰기</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BoardNavbar;
