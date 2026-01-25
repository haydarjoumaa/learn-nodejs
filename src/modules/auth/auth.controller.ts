import type { Request, Response } from "express";
import { prisma } from "../../prisma/index";

export const Login = async (_req: Request, res: Response) => {
  res.json({ message: "Login successful" });
};

export const SignUp = async (_req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      email: "haydarjoumaa@gmail.com",
      password: "12345678",
    },
  });
  res.json({ message: "User registered successfully", id: user.id });
};
