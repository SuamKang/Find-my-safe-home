import { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

import Logo from "./Logo";

import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppSelector } from "../../../redux/hooks";

// 이제 로그인 상태또한 설정완료했으니 프로필 페이지 구성하고 그 안에서 로그아웃 할 수 있는 버튼을 만들자

const Header = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  // console.log(isLogin);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const toggleHandler = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <header id="header" className={classes.header}>
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
