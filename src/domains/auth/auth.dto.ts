import z from "zod";
import { LoginRequestSchema, RegisterRequestSchema } from "./auth.schemas";
import { UserDTO } from "../users/users.dto";

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;
export type RegisterRequestDTO = z.infer<typeof RegisterRequestSchema>;

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
