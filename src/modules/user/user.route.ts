import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";

const userRouter = Router();

userRouter.get("/", authMiddleware, (_req, res) => {
  res.json({ message: "User route is working" });
});

export default userRouter;
