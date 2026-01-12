import { AuthService } from "@/src/domains/auth/auth.service";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { NextRequest } from "next/server";

export const POST = errorHandler(async (req: NextRequest) => {
  const data = await req.json();
  return await AuthService.login(req, data);
});
