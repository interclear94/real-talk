import { NextFunction, Request, Response } from "express";
import { ValidationError, UniqueConstraintError } from "sequelize";
import { AppError } from "../utils/err/AppError";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      ok: false,
      message: err.message,
    });
  }

  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      ok: false,
      message: "이미 사용 중인 값입니다.",
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      ok: false,
      message: "입력값이 올바르지 않습니다.",
    });
  }

  return res.status(500).json({
    ok: false,
    message: "서버 내부 오류가 발생했습니다.",
  });
};
