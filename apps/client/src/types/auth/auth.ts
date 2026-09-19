export interface SignupFormData {
  userId: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export interface SignupErrors {
  userId?: string;
  password?: string;
  passwordConfirm?: string;
  nickname?: string;
}
export type SignupRequest = Omit<SignupFormData, "passwordConfirm">;
