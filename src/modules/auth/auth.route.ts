import { Router } from "express";
import { Login, SignUp } from "./auth.controller";

const authRouter = Router();

authRouter.get("/login", Login);

authRouter.get("/sign-up", SignUp);

export default authRouter;
