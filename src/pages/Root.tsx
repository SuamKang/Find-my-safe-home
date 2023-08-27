import { Outlet } from "react-router-dom";

import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/footer/Footer";
function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
