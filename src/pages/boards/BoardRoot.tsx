import { Outlet } from "react-router-dom";

import BoardNavigation from "../../components/board/BoardNavigation";

const BoardRootLayout = () => {
  return (
    <>
      <BoardNavigation />
      <Outlet />
    </>
  );
};

export default BoardRootLayout;
