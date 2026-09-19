import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,

  // 로그인 또는 회원가입 성공 시 발급받은 토큰 저장
  setAccessToken: (token) => set({ accessToken: token }),

  // 로그아웃 시 토큰 초기화
  clearToken: () => set({ accessToken: null }),
}));
