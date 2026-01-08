import { NextResponse } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { authGuard } from "../_shared/utils/authGuard";
import { transactionsService } from "@/src/domains/transactions/transactions.service";

export const POST = errorHandler(
  authGuard(async (req) => {
    const data = await req.json();
    const result = await transactionsService.createTransaction(req.user!, data);
    return NextResponse.json(result);
  })
);
