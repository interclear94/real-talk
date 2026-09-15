import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import { conflict } from "../utils/err/AppError";

type SignupData = {
  user_id: string;
  password: string;
  nickname: string;
};

/**
 * 유저 id 중복
 * @param user_id - 유저의 아이디
 * @returns - 중복(O) true / 중복(X) False
 */
export const existsUserId = async (user_id: string): Promise<boolean> => {
  return !!(await User.findOne({ where: { user_id } }));
};

/**
 * 유저 nickname 중복
 * @param nickname - 유저의 닉네임
 * @returns - 중복(O) true / 중복(X) False
 */
export const existsNickname = async (nickname: string): Promise<boolean> => {
  return !!(await User.findOne({ where: { nickname } }));
};

export const signup = async (signupData: SignupData) => {
  const { user_id, password, nickname } = signupData;

  /**
   * 1. 아이디가 중복 check
   */
  const isUserIdDuplicated = await existsUserId(user_id);

  if (isUserIdDuplicated) {
    throw conflict("중복된 아이디입니다.");
  }

  /**
   * 2. 닉네임 중복 에러
   */
  const isNicknameDuplicated = await existsNickname(nickname);

  if (isNicknameDuplicated) {
    throw conflict("중복된 닉네임입니다.");
  }

  /**
   * 3. 비밀번호 해쉬 후 저장
   */
  const passwordHash = await bcrypt.hash(password, 5);

  /**
   * 4. 사용자 생성
   */
  const user = await User.create({
    user_id,
    password: passwordHash,
    nickname,
  });

  return user;
};
