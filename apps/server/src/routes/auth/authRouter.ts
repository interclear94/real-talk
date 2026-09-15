import { Router } from "express";
import { signupController } from "../../controllers/userController";
import asyncHandler from "../../utils/asyncHandler";

const authRouter = Router();

authRouter.post("/signup", asyncHandler(signupController));

export default authRouter;
