import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { passwordService } from "@/src/domains/password/password.service";
import { NextResponse } from "next/server";

export const POST = errorHandler(async (req) => {
  const { token, password } = await req.json();
  await passwordService.resetPasswordConfirm(token, password);
  return new NextResponse(null, { status: 200 });
});
