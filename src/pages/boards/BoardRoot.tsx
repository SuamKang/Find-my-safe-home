import { Outlet } from "react-router-dom";

import PageContent from "../../components/layouts/main/PageContent";
import BoardNavbar from "../../components/board/BoardNavbar";

const BoardRootLayout = () => {
  return (
    <PageContent>
      <BoardNavbar />
      <Outlet />
    </PageContent>
  );
};

export default BoardRootLayout;
