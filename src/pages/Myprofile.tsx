import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";
import PageContent from "../components/layouts/main/PageContent";
import Profile from "../components/user-profile/Profile";

const MyprofilePage = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <PageContent>{isLogin && <Profile />}</PageContent>;
};

export default MyprofilePage;
