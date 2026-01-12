import "dotenv/config";
import { z } from "zod";

/**
 * Runtime env validation.
 * App MUST crash on startup if config is invalid.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().default(4000),

  DATABASE_URL: z.url(),

  JWT_SECRET: z.string().min(5, "JWT_SECRET must be at least 5 characters"),
  JWT_EXPIRES_IN: z.string().default("1h"),

  SESSION_EXPIRES_IN_SECONDS: z.coerce.number().default(60 * 30), // 30m

  REDIS_HOST: z.string().default("127.0.0.1"),
  REDIS_PORT: z.coerce.number().default(6379),
});

export const env = envSchema.parse(process.env);
