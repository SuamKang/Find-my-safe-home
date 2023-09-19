import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import MyprofilePage from "./pages/Myprofile";
import NewsPage from "./pages/News";
import BoardPage from "./pages/boards/Board";
import BoardRootLayout from "./pages/boards/BoardRoot";
import PostPage from "./pages/boards/Post";
import EditPostPage from "./pages/boards/EditPost";
import NewPostPage from "./pages/boards/NewPost";
import FaqPage from "./pages/Faq";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import { tokenLoader } from "./shared/token";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/profile",
        element: <MyprofilePage />,
      },
      {
        path: "/board",
        element: <BoardRootLayout />,
        children: [
          {
            path: "/board",
            element: <BoardPage />,
          },
          {
            path: "/board/:postId",
            id: "post-detail",
            children: [
              {
                path: "/board/:postId",
                element: <PostPage />,
              },
              {
                path: "/board/:postId/edit-post",
                element: <EditPostPage />,
              },
            ],
          },
          {
            path: "/board/new-post",
            element: <NewPostPage />,
          },
        ],
      },
      {
        path: "/news",
        element: <NewsPage />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
