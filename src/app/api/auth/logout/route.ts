import { authService } from "@/src/domains/auth/auth.service";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { NextResponse } from "next/server";

export const POST = errorHandler(async () => {
  await authService.logout();
  return NextResponse.json(null, { status: 200 });
});
