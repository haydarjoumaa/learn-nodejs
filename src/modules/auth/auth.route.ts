import { Router } from "express";
import { Login, SignUp } from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", Login);

authRouter.post("/sign-up", SignUp);

export default authRouter;
