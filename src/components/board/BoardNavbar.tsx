import { Link, useNavigate } from "react-router-dom";
import classes from "./BoardNavbar.module.css";
import { useAppSelector } from "../../redux/hooks";

const BoardNavbar = () => {
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.auth.isLogin);

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
            {isLogin ? (
              <Link to="/board/new-post">글쓰기</Link>
            ) : (
              <span
                onClick={() => {
                  alert("로그인 해야 이용 가능합니다.");
                  navigate("/login");
                }}
              >
                글쓰기
              </span>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BoardNavbar;
