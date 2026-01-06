import z from "zod";
import { LoginRequestSchema } from "./auth.schemas";

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;

export type UserJwtDTO = { id: number; username: string; email: string };
