export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;

    // Error를 상속했기 때문에 prototype을 명확하게 설정
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const badRequest = (message: string) => new AppError(400, message);

export const unauthorized = (message: string) => new AppError(401, message);

export const forbidden = (message: string) => new AppError(403, message);

export const notFound = (message: string) => new AppError(404, message);

export const conflict = (message: string) => new AppError(409, message);
