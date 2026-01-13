import { NextResponse } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { authGuard } from "../../_shared/utils/authGuard";
import { transactionsService } from "@/src/domains/transactions/transactions.service";

export const GET = errorHandler(
  authGuard(async (_, ctx) => {
    const user = ctx.user!;
    const balance = await transactionsService.getUserBalance(user.id);
    return NextResponse.json({ balance });
  })
);
