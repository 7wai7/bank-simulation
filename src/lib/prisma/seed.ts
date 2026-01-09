import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter: pool });

async function main() {
  const user1 = await prisma.user.create({
    data: {
      username: "user",
      email: "user@gmail.com",
      hash_password:
        "$2b$10$v6GcmAYmnobBGc.UKFnar.xSdyIeGryi/65nfNzRAOutWrybJm6lu",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "user1",
      email: "user1@gmail.com",
      hash_password:
        "$2b$10$1fxERz3R0vpfTi/21HGRAOjrEYALsWN9N/U9KWxI/r6HwK0QaT2du",
    },
  });

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
