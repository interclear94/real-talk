import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useSignupMutation } from "./hooks/useSignupMutation";
import { validate } from "./utils/validate";
import type { SignupErrors, SignupFormData } from "../../types/auth/auth";

export default function SignupForm() {
  const [form, setForm] = useState<SignupFormData>({
    userId: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

  const [errors, setErrors] = useState<SignupErrors>({});

  // React Query 커스텀 훅 호출
  const signupMutation = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 에러 객체 반환받기
    const validationErrors = validate(form);

    // 에러가 하나라도 존재하면 상태를 업데이트하고 중단
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 유효성 검사 통과 시 에러 초기화 및 API 요청
    setErrors({});

    signupMutation.mutate({
      userId: form.userId,
      password: form.password,
      nickname: form.nickname,
    });
  };

  const handleCheckUserId = () => {
    // TODO: 아이디 중복 검사 API 연동
    console.log("아이디 중복체크:", form.userId);
  };

  const handleCheckNickname = () => {
    // TODO: 닉네임 중복 검사 API 연동
    console.log("닉네임 중복체크:", form.nickname);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">아이디</label>
        <div className="flex gap-2">
          <Input
            type="text"
            name="userId"
            placeholder="영문과 숫자를 포함하여 6~20자"
            value={form.userId}
            onChange={handleChange}
          />
          <Button type="button" onClick={handleCheckUserId}>
            중복체크
          </Button>
        </div>
        {errors.userId && (
          <p className="mt-1 text-sm text-red-500">{errors.userId}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">비밀번호</label>
        <Input
          type="password"
          name="password"
          placeholder="영어, 숫자, 특수문자를 포함하여 10자 이상"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">비밀번호 확인</label>
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력해주세요."
          value={form.passwordConfirm}
          onChange={handleChange}
        />
        {errors.passwordConfirm && (
          <p className="mt-1 text-sm text-red-500">{errors.passwordConfirm}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">닉네임</label>
        <div className="flex gap-2">
          <Input
            type="text"
            name="nickname"
            placeholder="2글자 이상 10글자 미만"
            value={form.nickname}
            onChange={handleChange}
          />
          <Button type="button" onClick={handleCheckNickname}>
            중복체크
          </Button>
        </div>
        {errors.nickname && (
          <p className="mt-1 text-sm text-red-500">{errors.nickname}</p>
        )}
      </div>

      <Button type="submit" disabled={signupMutation.isPending}>
        {signupMutation.isPending ? "가입 중..." : "회원가입"}
      </Button>
    </form>
  );
}
