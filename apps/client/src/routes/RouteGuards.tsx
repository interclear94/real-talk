import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

// 로그인한 사용자만 접근 가능한 라우트 (마이페이지 등)[span_1](start_span)[span_1](end_span)
export const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// 로그인하지 않은 사용자만 접근 가능한 라우트 (회원가입, 로그인 등)[span_2](start_span)[span_2](end_span)
export const PublicOnlyRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
