import { NextResponse } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { authGuard } from "../_shared/utils/authGuard";
import { prisma } from "@/src/lib/prisma";
import { AppError } from "../_shared/utils/appError";
import { TransactionRequestSchema } from "@/src/domains/transactions/transactions.schemas";

export const GET = errorHandler(
  authGuard(async (req) => {
    const user = req.user;
    console.log(user);

    return NextResponse.json(null);
  })
);

export const POST = errorHandler(
  authGuard(async (req) => {
    const data = await req.json();
    const parsed = TransactionRequestSchema.safeParse(data);
    if (!parsed.success) throw new AppError(parsed.error.issues[0].message);

    const { to, amount } = parsed.data;

    if (req.user!.email === to)
      throw new AppError("You cannot send tokens to yourself", 404);

    const toUser = await prisma.user.findUnique({
      where: { email: to },
    });
    if (!toUser) throw new AppError("User not found", 404);

    await prisma.$transaction(async (tx) => {
      const fromBalance = await tx.ledgerEntry.aggregate({
        where: { user_id: req.user!.id },
        _sum: { amount: true },
      });

      if ((fromBalance._sum.amount ?? 0) < amount) {
        throw new AppError("Insufficient funds", 400);
      }

      await tx.transaction.create({
        data: {
          from: {
            connect: { id: req.user!.id },
          },
          to: {
            connect: { id: toUser.id },
          },
          amount,
        },
      });

      // from user
      await tx.ledgerEntry.create({
        data: {
          amount: -amount,
          user: {
            connect: { id: req.user!.id },
          },
        },
      });

      // to user
      await tx.ledgerEntry.create({
        data: {
          amount,
          user: {
            connect: { id: toUser.id },
          },
        },
      });
    });

    const newBalance = await prisma.ledgerEntry.aggregate({
      where: { user_id: req.user!.id },
      _sum: { amount: true },
    });

    return NextResponse.json(newBalance);
  })
);
