import { Outlet, Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function RootLayout() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const clearToken = useAuthStore((s) => s.clearToken);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b p-4">
        <Link to="/" className="text-xl font-bold">
          App Logo
        </Link>
        <nav className="flex gap-4">
          {accessToken ? (
            <>
              <Link to="/mypage">마이페이지</Link>
              <button onClick={clearToken}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </nav>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <Outlet />
      </main>
    </div>
  );
}
