import Logo from "./Logo";

import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className={classes.header}>
      <div>
        <Logo />
      </div>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="auth"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              로그인
            </NavLink>
          </li>
          <li>
            <NavLink
              to="auth"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              프로필
            </NavLink>
          </li>
          <li>
            <NavLink
              to="auth"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              체트리스트
            </NavLink>
          </li>
          <li>
            <NavLink
              to="auth"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              자유게시판
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
