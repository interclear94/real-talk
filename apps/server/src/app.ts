import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

// 반드시 일반 라우터보다 뒤에 위치
app.use(errorMiddleware);

export default app;
