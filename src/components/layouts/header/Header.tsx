import { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

import Logo from "./Logo";

import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { asyncAuthActions } from "../../../redux/actions/auth-action";

// 이제 로그인 상태또한 설정완료했으니 프로필 페이지 구성하고 그 안에서 로그아웃 할 수 있는 버튼을 만들자

const Header = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();
  // console.log(isLogin);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  // 토글 핸들러
  const toggleHandler = () => {
    setIsToggleOpen((prev) => !prev);
  };

  // 토글 드롭다운 메뉴 취소 헨들러
  const closeDrodownMenu = () => {
    setIsToggleOpen(false);
  };

  // 로그아웃 헨들러
  const logoutHandler = () => {
    const dobbleCheck = window.confirm("정말 로그아웃 할꺼에요?");

    if (dobbleCheck) {
      dispatch(asyncAuthActions.logOutFB());
    }
  };

  return (
    <header id="header" className={classes.header}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <nav className={`${classes.nav} ${isToggleOpen ? classes.open : ""}`}>
        <ul className={classes.list}>
          {isLogin ? (
            <>
              <li>
                <button type="button" onClick={logoutHandler}>
                  로그아웃
                </button>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  onClick={closeDrodownMenu}
                >
                  프로필
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                onClick={closeDrodownMenu}
              >
                로그인
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              onClick={closeDrodownMenu}
            >
              뉴스소식
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/board"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              onClick={closeDrodownMenu}
            >
              자유게시판
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              onClick={closeDrodownMenu}
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
