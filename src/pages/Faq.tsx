import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Faq from "../components/Faq/Faq";
import PageContent from "../components/layouts/main/PageContent";
const FaqPage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <PageContent>
      <Faq />
    </PageContent>
  );
};

export default FaqPage;
