import { authService } from "@/src/domains/auth/auth.service";
import { NextRequest } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";

export const POST = errorHandler(async (req: NextRequest) => {
  const data = await req.json();
  return await authService.register(req, data);
});
