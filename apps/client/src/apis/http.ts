import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_BASE_URL; // API URL

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ----------------------------------------------------
// 1. 요청 인터셉터 (Request Interceptor)
// ----------------------------------------------------
api.interceptors.request.use(
  // 요청이 전달되기 전에 헤더에 토큰 넣기
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const newConfig = { ...config };
      newConfig.headers.Authorization = `Bearer ${token}`;
      return newConfig;
    }
    return config;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

// 응답(Response) 인터셉터 (예: 토큰 만료 시 재발급 로직을 여기에 추가 가능)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 에러(인증 실패) 처리 등 추가 가능
    return Promise.reject(error);
  },
);

// ----------------------------------------------------
// 2. 응답 인터셉터 (Response Interceptor: 401 토큰 갱신 & 재요청)
// ----------------------------------------------------

// 동시에 발생한 요청들을 대기시키기 위한 플래그 및 대기 큐
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

// 대기 중인 요청들을 일괄 처리하는 함수
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 Unauthorized 발생 및 아직 재시도하지 않은 요청인 경우
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // 무한 루프 방지용 플래그 설정
      originalRequest._retry = true;

      // 이미 다른 요청으로 인해 토큰 재발급이 진행 중인 경우 대기 큐에 등록
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // 새 Access Token 요청
        // ⚠️ 주의: 무한 인터셉터 방지를 위해 기본 axios 또는 토큰 갱신 전용 인스턴스를 사용합니다.
        // Refresh Token은 보통 HttpOnly 쿠키로 자동 전송되거나 body/header로 전달합니다.
        const { data } = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = data.accessToken;

        // Zustand 전역 상태에 새로운 토큰 갱신
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 대기 중이던 다른 API 요청들에게 새 토큰 전달 후 해제
        processQueue(null, newAccessToken);

        // 실패했던 원래 요청의 헤더를 새 토큰으로 교체 후 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 (예: Refresh Token 만료)
        processQueue(refreshError, null);

        // 스토어 토큰 초기화 및 로그인 페이지로 리다이렉트
        useAuthStore.getState().clearToken();
        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
