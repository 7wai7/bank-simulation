import { AuthService } from "@/src/domains/auth/auth.service";
import { NextResponse } from "next/server";
import { saveCookieToken } from "../../_shared/utils/saveCookieToken";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";

export const POST = errorHandler(async (req: Request) => {
  const { username, email, password } = await req.json();

  const { user, token } = await AuthService.register(username, email, password);

  const res = NextResponse.json(user);
  saveCookieToken(res, token);

  return res;
});
