import z from "zod";
import { LoginRequestSchema, RegisterRequestSchema } from "./auth.schemas";

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;
export type RegisterRequestDTO = z.infer<typeof RegisterRequestSchema>;

export type UserDTO = { id: number; username: string; email: string };

export type SessionDTO = {
  id: string;
  tokenHash: string;
  user_id: number;
  user: UserDTO;
  createdAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
  ip: string | null;
  userAgent: string | null;
};
