import { NextResponse } from "next/server";
import { errorHandler } from "@/app/api/lib/errorHandler";
import { requireUser } from "@/app/lib/utils/requireUser";

export const GET = errorHandler(async () => {
  const user = await requireUser();
  const res = NextResponse.json(user);
  return res;
});
