import { prisma } from "@/src/lib/prisma";
import { UserDTO } from "../auth/auth.dto";

class UsersService {
  async getUsersByEmail({
    currentUser,
    email,
    limit = 10,
  }: {
    currentUser?: UserDTO;
    email: string;
    limit?: number;
  }) {
    return prisma.user.findMany({
      where: {
        email: {
          contains: email,
          mode: "insensitive",
        },
        id: currentUser?.id ? { not: currentUser.id } : undefined,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
      take: limit,
    });
  }
}

export const usersService = new UsersService();
