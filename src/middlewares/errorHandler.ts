import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/client";
import { AppError } from "../utils/AppError";
export function errorHandler(err, req, res, next) {
  console.log(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        message: "Unique constraint failed",
        meta: err.meta,
      });
    }
    return res.status(400).json({ message: "Database error", code: err.code });
  }
  if (err instanceof PrismaClientValidationError) {
    return res.status(400).json({ message: "Invalid database query" });
  }
  return res.status(500).json({ message: "Internal server error" });
}
