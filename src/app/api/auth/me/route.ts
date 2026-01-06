import { NextResponse } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { requireUser } from "@/src/shared/utils/requireUser";

export const GET = errorHandler(async () => {
  const user = await requireUser();
  const res = NextResponse.json(user);
  return res;
});
