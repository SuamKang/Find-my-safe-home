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

// 리엑트 라우터 V6.4업데이트 후 createBrowserRouter 지원
// 공식문서에 나온 예제대로 createBrowserRouter첫번째 인자로 객체형식의 라우터 지정
const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
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

// 리엑트 라우터 v6 loader를 사용하여 브라우저 단에서 백엔드로 보내는 api요청을 응답으로 받고 로더가 요청을 해주도록 해서 해당 비동기 요청 사이의 에러나 작업 처리를 하려고 했다.

// 다만 현재 백엔드로 인증 서비스나 데이터베이스를 firebase를 이용하고 있어서, 로더와 함께 해당 데이터베이스를 관리 하는 방법을 찾지 못했다.

// 우선 firebase에서 제공하는 realtime databse에 접근하여 요청을 보낼수 있도록 코드를 수정하고 요청 상태에 따른 에러처리도 frebase에서 제공하는 값들이 있을것 같으니 그것을 찾아보고 클라이언트 단에서 처리해주도록 하자... loader를 써보고 싶었는데ㅠㅠㅠ
