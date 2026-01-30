import { JWT_EXPIRES_IN, JWT_SECRET } from "../../config/env";
import { prisma } from "../../prisma/index";
import { AppError } from "../../utils/AppError";
import { isStrongPassword, isValidEmail } from "../../utils/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 1;

export const createUser = async (email: string, password: string) => {
  // Here you would normally add logic to save the user to the database

  if (!isValidEmail(email)) {
    throw new AppError("Invalid email format", 400);
  }
  if (!isStrongPassword(password)) {
    throw new AppError(
      "strong password has at least 8 characters, including uppercase, lowercase, number, and special character",
      400,
    );
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  if (!isValidEmail(email)) {
    throw new AppError("Invalid email format", 400);
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Wrong password", 401);
  }

  const token = generateToken(user);

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "strict",
  // });

  return { user, token };
};

export function generateToken(user: { id: string; email: string }) {
  const jwtSecret = JWT_SECRET;
  if (!jwtSecret) {
    throw new AppError("JWT secret is not configured", 500);
  }

  const expiresIn = (JWT_EXPIRES_IN || "1d") as jwt.SignOptions["expiresIn"];

  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn,
    },
  );
}
