import { Request, Response } from "express";
import { signup } from "../services/userService";
import { badRequest } from "../utils/err/AppError";

export const signupController = async (req: Request, res: Response) => {
  const { user_id, password, nickname } = req.body;

  /**
   * user_id validation
   * 영문 대/소문자 + 숫자 6~20자
   */
  const idRegex = /^[a-zA-Z0-9]{6,20}$/;

  if (!idRegex.test(user_id)) {
    throw badRequest(
      "아이디는 영문과 숫자를 포함하여 6자 이상 20자 이하이어야 합니다.",
    );
  }

  /**
   * password validation
   * 영문 + 숫자 + 특수문자 포함, 10자 이상
   */
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;

  if (!passwordRegex.test(password)) {
    throw badRequest(
      "비밀번호는 영어, 숫자, 특수문자를 포함하여 10자 이상이어야 합니다.",
    );
  }

  const result = await signup({
    user_id,
    password,
    nickname,
  });

  res.status(201).json({
    ok: true,
    result,
    message: "회원가입이 성공하였습니다.",
  });
};
