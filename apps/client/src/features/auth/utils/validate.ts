interface SignupFormData {
  userId: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

interface SignupErrors {
  userId?: string;
  password?: string;
  passwordConfirm?: string;
  nickname?: string;
}

export const validateUserId = (userId: string) => {
  return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/.test(userId);
};

export const validatePassword = (password: string) => {
  return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{10,}$/.test(password);
};

export const validateNickname = (nickname: string) => {
  return nickname.length >= 2 && nickname.length < 10;
};

export const validate = (signupForm: SignupFormData): SignupErrors => {
  const errors: SignupErrors = {};

  // 아이디
  if (!validateUserId(signupForm.userId)) {
    errors.userId = "아이디는 영문과 숫자를 포함하여 6~20자로 입력해주세요.";
  }

  // 비밀번호
  if (!validatePassword(signupForm.password)) {
    errors.password =
      "비밀번호는 영어, 숫자, 특수문자를 포함하여 10자 이상 입력해주세요.";
  }

  // 비밀번호 확인
  if (signupForm.password !== signupForm.passwordConfirm) {
    errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
  }

  // 닉네임
  if (!validateNickname(signupForm.nickname)) {
    errors.nickname = "닉네임은 2글자 이상 10글자 미만이어야 합니다.";
  }

  return errors;
};
