import { createBrowserRouter } from "react-router-dom";
import { PublicOnlyRoute } from "./RouteGuards";
import SignupPage from "../pages/auth/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>홈 화면 메인입니다.</div>,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <div>로그인 페이지</div>,
      },
    ],
  },
]);
