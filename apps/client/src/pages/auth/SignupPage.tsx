import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuthStore } from "../../store/useAuthStore";
import type { SignupErrors, SignupFormData } from "../../types/auth/auth";
import { validate } from "../../features/auth/utils/validate";
import {
  signup,
  type ApiErrorResponse,
} from "../../features/auth/apis/auth-api";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function SignupPage() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const [form, setForm] = useState<SignupFormData>({
    userId: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const data = await signup({
        userId: form.userId,
        password: form.password,
        nickname: form.nickname,
      });

      if (data.accessToken) {
        setAccessToken(data.accessToken);
      }

      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const message =
        axiosError.response?.data?.message || "회원가입에 실패했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 bg-white p-6 rounded shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>

        <div>
          <label className="mb-2 block text-sm font-medium">아이디</label>
          <Input
            type="text"
            name="userId"
            placeholder="영문/숫자 포함 6~20자"
            value={form.userId}
            onChange={handleChange}
          />
          {errors.userId && (
            <p className="mt-1 text-sm text-red-500">{errors.userId}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">비밀번호</label>
          <Input
            type="password"
            name="password"
            placeholder="영어, 숫자, 특수문자 포함 10자 이상"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            비밀번호 확인
          </label>
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 다시 입력해주세요."
            value={form.passwordConfirm}
            onChange={handleChange}
          />
          {errors.passwordConfirm && (
            <p className="mt-1 text-sm text-red-500">
              {errors.passwordConfirm}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">닉네임</label>
          <Input
            type="text"
            name="nickname"
            placeholder="2~10글자 미만"
            value={form.nickname}
            onChange={handleChange}
          />
          {errors.nickname && (
            <p className="mt-1 text-sm text-red-500">{errors.nickname}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full mt-4">
          {isLoading ? "가입 중..." : "회원가입"}
        </Button>
      </form>
    </div>
  );
}
