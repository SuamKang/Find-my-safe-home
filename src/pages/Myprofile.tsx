import { useEffect } from "react";
import PageContent from "../components/layouts/main/PageContent";
import Profile from "../components/user-profile/Profile";
import { useLocation } from "react-router-dom";
const MyprofilePage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <PageContent>
      <Profile />
    </PageContent>
  );
};

export default MyprofilePage;
