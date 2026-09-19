import { api } from "../../../apis/http";
import type { SignupRequest } from "../../../types/auth/auth";

// 회원가입 성공 시 서버에서 내려주는 응답 데이터 타입
export interface SignupResponse {
  accessToken?: string;
  message?: string;
  // 서버에서 내려주는 추가 필드가 있다면 여기에 추가 (예: userId, nickname 등)
}

// 서버 실패 시 내려주는 에러 응답 구조 (백엔드 에러 양식에 맞춤)
export interface ApiErrorResponse {
  message?: string;
  status?: number;
}

export const signup = async (
  signupData: SignupRequest,
): Promise<SignupResponse> => {
  const { data } = await api.post<SignupResponse>("/auth/signup", signupData);

  console.log(data);
  return data;
};
