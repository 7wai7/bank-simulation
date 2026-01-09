import { NextResponse } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { authGuard } from "../_shared/utils/authGuard";
import { transactionsService } from "@/src/domains/transactions/transactions.service";

export const GET = errorHandler(
  authGuard(async (req) => {
    const url = new URL(req.url);
    const cursor = url.searchParams.get("cursor"); // останній transaction.id
    const limit = Number(url.searchParams.get("limit") ?? 20);

    const prismaCursor = cursor ? { id: Number(cursor) ?? undefined } : undefined;

    const items = await transactionsService.getUserTransactions(
      req.user!.id,
      prismaCursor,
      limit
    );

    return NextResponse.json(items);
  })
);

export const POST = errorHandler(
  authGuard(async (req) => {
    const data = await req.json();
    const result = await transactionsService.createTransaction(req.user!, data);
    return NextResponse.json(result);
  })
);
