import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { env } from "@/src/shared/config/env";
import { UserDTO } from "@/src/domains/auth/auth.dto";

export async function requireUserJwt() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const payload = verify(token, env.JWT_SECRET) as UserDTO;

    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
  } catch {
    return null;
  }
}
