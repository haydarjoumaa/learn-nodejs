import type { NextFunction, Request, Response } from "express";
import { createUser, loginUser } from "./auth.service";

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const newSignUpUser = await createUser(email, password);

    return res.json({
      message: "User registered successfully",
      id: newSignUpUser.id,
    });
  } catch (error) {
    next(error);
  }
};

export const Login = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = _req.body;

  try {
    const loginUserResponse = await loginUser(email, password);
    res.json(loginUserResponse);
  } catch (error) {
    next(error);
  }
};
