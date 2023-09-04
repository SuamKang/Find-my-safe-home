import { Outlet } from "react-router-dom";

import PageContent from "../components/layouts/main/PageContent";
import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/footer/Footer";
const RootLayout = () => {
  return (
    <>
      <Header />
      <PageContent>
        <Outlet />
      </PageContent>
      <Footer />
    </>
  );
};

export default RootLayout;
