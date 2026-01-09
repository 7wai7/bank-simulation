import redis from "@/src/lib/redis";
import { UserJwtDTO } from "../auth/auth.dto";
import { prisma } from "@/src/lib/prisma";
import { AppError } from "@/src/app/api/_shared/utils/appError";
import { TransactionRequestSchema } from "./transactions.schemas";

class TransactionsService {
  async getUserBalance(userId: number) {
    let balance = null;
    let balanceCache = null;

    try {
      balanceCache = await redis.get(`user-balance-${userId}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {}

    if (balanceCache) balance = +balanceCache;
    else balance = await this.aggregateUserBalance(userId);

    return balance ?? 0;
  }

  async getUserTransactions(
    userId: number,
    cursor?: { id: number },
    limit = 20
  ) {
    return prisma.transaction.findMany({
      where: {
        OR: [{ from: { id: userId } }, { to: { id: userId } }],
      },
      include: {
        from: { select: { id: true, username: true, email: true } },
        to: { select: { id: true, username: true, email: true } },
      },
      orderBy: { id: "desc" },
      take: limit,
      cursor,
      skip: cursor ? 1 : 0,
    });
  }

  async createTransaction(user: UserJwtDTO, data: unknown) {
    const parsed = TransactionRequestSchema.safeParse(data);
    if (!parsed.success) throw new AppError(parsed.error.issues[0].message);

    const { to, amount, description } = parsed.data;

    if (user.email === to)
      throw new AppError("You cannot send tokens to yourself", 400);

    const toUser = await prisma.user.findUnique({
      where: { email: to },
    });
    if (!toUser) throw new AppError("User not found", 404);

    let newTransaction;

    await prisma.$transaction(async (tx) => {
      const fromBalance = await tx.ledgerEntry.aggregate({
        where: { user_id: user.id },
        _sum: { amount: true },
      });

      if ((fromBalance._sum.amount ?? 0) < amount) {
        throw new AppError("Insufficient funds", 400);
      }

      newTransaction = await tx.transaction.create({
        data: {
          from_id: user.id,
          to_id: toUser.id,
          amount,
          description,
        },
        include: {
          from: { select: { id: true, username: true, email: true } },
          to: { select: { id: true, username: true, email: true } },
        },
      });

      // from user
      await tx.ledgerEntry.create({
        data: {
          amount: -amount,
          user: {
            connect: { id: user.id },
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

    const newBalance = await this.aggregateUserBalance(user.id);
    const balance = newBalance ?? 0;

    try {
      await redis.set(`user-balance-${user.id}`, String(balance), "EX", 10);
      await redis.del(`user-balance-${toUser.id}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {}

    return {
      transaction: newTransaction,
      balance,
    };
  }

  async aggregateUserBalance(userId: number) {
    const balance = await prisma.ledgerEntry.aggregate({
      where: { user_id: userId },
      _sum: { amount: true },
    });

    return balance._sum.amount;
  }
}

export const transactionsService = new TransactionsService();
