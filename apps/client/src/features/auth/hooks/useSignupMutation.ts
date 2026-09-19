import { useMutation } from "@tanstack/react-query";
import { signup } from "../apis/auth-api";
import { useAuthStore } from "../../../store/useAuthStore";
// import { useNavigate } from "react-router-dom";

export const useSignupMutation = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      // 서버 구조에 따라 다름: 회원가입 성공 시 즉시 토큰을 반환하는 경우
      if (data?.accessToken) {
        setAccessToken(data.accessToken);
      }
      alert("회원가입이 완료되었습니다.");
      // navigate("/login");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "회원가입에 실패했습니다.";
      alert(message);
    },
  });
};
