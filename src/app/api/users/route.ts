import { NextResponse } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { authGuard } from "../_shared/utils/authGuard";
import { usersService } from "@/src/domains/users/users.service";
import { AppError } from "../_shared/utils/appError";

export const GET = errorHandler(
  authGuard(async (req, ctx) => {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    const limit = Number(url.searchParams.get("limit") ?? 10);
    if (!email) throw new AppError("Bad request", 400);

    const users = await usersService.getUsersByEmail({
      currentUser: ctx.user,
      email,
      limit,
    });

    return NextResponse.json(users);
  })
);
