import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { passwordService } from "@/src/domains/password/password.service";
import { NextResponse } from "next/server";

export const POST = errorHandler(async (req) => {
  const data = await req.json();
  const url = new URL(req.url);

  try {
    await passwordService.sendMailToResetPassword({
      ...data,
      origin: url.origin,
    });
  } catch (e: unknown) {
    console.error(e);
  }

  return NextResponse.json({}); // завжди повертати status 200
});
