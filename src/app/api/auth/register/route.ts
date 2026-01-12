import { authService } from "@/src/domains/auth/auth.service";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { saveCookieSession } from "../../_shared/utils/saveCookieSession";

export const POST = errorHandler(async (req: NextRequest) => {
  const data = await req.json();
  const [session, raw] = await authService.register(req, data);
  const res = NextResponse.json(session.user);
  saveCookieSession(res, raw, session);
  return res;
});
