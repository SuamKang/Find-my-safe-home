import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import AuthenticationPage from "./pages/Auth";
import MyprofilePage from "./pages/Myprofile";
import NewsPage from "./pages/News";
import BoardPage from "./pages/boards/Board";
import BoardRootLayout from "./pages/boards/BoardRoot";
import PostPage from "./pages/boards/Post";
import EditPostPage from "./pages/boards/EditPost";
import NewPostPage from "./pages/boards/NewPost";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
      },
      {
        path: "board",
        element: <BoardRootLayout />,
        children: [
          {
            index: true,
            element: <BoardPage />,
          },
          {
            path: ":postId",
            id: "post-detail",
            children: [
              {
                index: true,
                element: <PostPage />,
              },
              {
                path: "edit-post",
                element: <EditPostPage />,
              },
            ],
          },
          {
            path: "new-post",
            element: <NewPostPage />,
          },
        ],
      },
      {
        path: "profile",
        element: <MyprofilePage />,
      },
      {
        path: "news",
        element: <NewsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
