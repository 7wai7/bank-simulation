import { SessionDTO } from "@/src/domains/auth/auth.dto";
import { env } from "@/src/shared/config/env";
import { NextResponse } from "next/server";

export async function saveCookieSession(
  res: NextResponse,
  rawToken: string,
  session: SessionDTO
) {
  res.cookies.set("session", rawToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    expires: session.expiresAt,
  });
}
