import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";

dotenv.config({ path: envFile });

export const {
  PORT_NUMBER,
  NODE_ENV,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;

console.log(`Environment: ${NODE_ENV}, Port: ${PORT_NUMBER}`);
