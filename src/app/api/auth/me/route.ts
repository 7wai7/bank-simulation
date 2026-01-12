import { NextResponse } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { requireUserSessionSafe } from "@/src/shared/utils/requireUserSession";
import { redirect } from "next/navigation";

export const GET = errorHandler(async () => {
  const result = await requireUserSessionSafe();
  if (!result.session) return redirect("/auth");
  const user = result.session.user;
  const res = NextResponse.json(user);
  return res;
});
