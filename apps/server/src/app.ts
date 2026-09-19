import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import cors from "cors";
const app = express();

// 프론트엔드 주소 (실제 배포 환경의 도메인 또는 로컬 개발 주소)
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const corsOptions = {
  origin: FRONTEND_URL, // 클라이언트 도메인을 정확히 명시 ( '*' 사용 불가 )
  credentials: true, // 프론트엔드의 withCredentials: true 와 짝을 맞추기 위해 필수
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // 허용할 HTTP 메서드
  allowedHeaders: ["Content-Type", "Authorization"], // 클라이언트가 전송할 수 있는 헤더
};

// 미들웨어 등록
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

/**
 * Error Middleware
 * 주의: router 뒤에서 사용할 것
 */
app.use(errorMiddleware);

export default app;
