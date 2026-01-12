import { AuthService } from "@/src/domains/auth/auth.service";
import { NextRequest } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";

export const POST = errorHandler(async (req: NextRequest) => {
  const data = await req.json();
  return await AuthService.register(req, data);
});
