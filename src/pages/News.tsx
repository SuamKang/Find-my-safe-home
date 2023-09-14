import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageContent from "../components/layouts/main/PageContent";

const NewsPage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <PageContent>
      <h1>부동산 뉴스 준비중 입니다.</h1>
    </PageContent>
  );
};

export default NewsPage;
