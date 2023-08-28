import Logo from "./Logo";

import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
// import { useState } from "react";

const Header = () => {
  const isLogin = false; // 임시

  return (
    <header className={classes.header}>
      <div>
        <Logo />
      </div>
      <nav>
        <ul className={classes.list}>
          {isLogin ? (
            <li>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                프로필
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                로그인
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="news"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              뉴스소식
            </NavLink>
          </li>
          <li>
            <NavLink
              to="board"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              자유게시판
            </NavLink>
          </li>
          <li>
            <NavLink
              to="faq"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              FAQ
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
