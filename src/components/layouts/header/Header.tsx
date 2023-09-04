import { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

import Logo from "./Logo";

import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const isLogin = false; // 임시

  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const toggleHandler = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <nav className={`${classes.nav} ${isToggleOpen ? classes.open : ""}`}>
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
      <IconContext.Provider
        value={{ color: "var(--color-primary-500", size: "30" }}
      >
        <GiHamburgerMenu className={classes.toggle} onClick={toggleHandler} />
      </IconContext.Provider>
    </header>
  );
};

export default Header;
