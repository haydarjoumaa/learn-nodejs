import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.route";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import userRouter from "./modules/user/user.route";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
