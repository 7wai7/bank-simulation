import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { env } from "@/app/config/env";
import { UserJwtDTO } from "../types/user.types";

export async function requireUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const payload = verify(token, env.JWT_SECRET) as UserJwtDTO;

    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
  } catch {
    return null;
  }
}
