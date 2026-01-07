import { NextResponse } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { authGuard } from "../_shared/utils/authGuard";

export const GET = errorHandler(
  authGuard(async (req) => {
    const user = req.user;
    console.log(user)

    return NextResponse.json(null);
  })
);
