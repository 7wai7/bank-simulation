import { authService } from "@/src/domains/auth/auth.service";
import { req__mock } from "@/src/shared/mocks/req.mock";
import { users__mock } from "@/src/shared/mocks/users.mock";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { env } from "process";

const pool = new PrismaPg({ connectionString: env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter: pool });

async function main() {
  const [user1, user2] = await Promise.all(
    users__mock.map((u) => authService.register(req__mock, u))
  ).then((data) => data.map((v) => v[0].user));

  await prisma.ledgerEntry.create({
    data: {
      user_id: user1.id,
      amount: 10000,
    },
  });

  await prisma.ledgerEntry.create({
    data: {
      user_id: user2.id,
      amount: 10000,
    },
  });

  console.log("Seed finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
