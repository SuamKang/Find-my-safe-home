import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// import { apiKey } from "../shared/firebase";

import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/footer/Footer";

import { useAppDispatch } from "../redux/hooks";
import { asyncAuthActions } from "../redux/actions/auth-action";
import { getTokenFromSessionStorage } from "../shared/token";
const RootLayout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = getTokenFromSessionStorage();

    if (token) {
      dispatch(asyncAuthActions.logInCheckFB());
    }
  }, [location.pathname, dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
