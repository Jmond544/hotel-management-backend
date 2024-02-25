import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { UserController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/login", UserController.login);
userRouter.post("/register", UserController.register);
userRouter.post("/verify", UserController.verifyCode);
userRouter.get("/profile", verifyToken, UserController.profile);