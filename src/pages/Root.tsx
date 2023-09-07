import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { apiKey } from "../shared/firebase";

import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/footer/Footer";

import { useAppDispatch } from "../redux/hooks";
import { authAction } from "../redux/actions/auth-action";
import { getTokenFromSessionStorage } from "../shared/token";
const RootLayout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // console.log(_session_key); // 로그인하면 있음
  // console.log(sessionStorage.getItem(_session_key)); // null
  const is_session = !!sessionStorage.getItem(_session_key);

  useEffect(() => {
    const token = getTokenFromSessionStorage();

    if (token && is_session) {
      // 토큰이 있고 세션에 인증이 있으면
      dispatch(authAction.logInCheckFB());
    }
  }, [dispatch, location.pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
