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

// 리엑트 라우터 V6.4업데이트 후 createBrowserRouter 지원
// 공식문서에 나온 예제대로 createBrowserRouter첫번째 인자로 객체형식의 라우터 지정
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
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "profile",
        element: <MyprofilePage />,
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
        path: "news",
        element: <NewsPage />,
      },
      {
        path: "faq",
        element: <FaqPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
