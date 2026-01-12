import crypto from "crypto";
import { AppError } from "@/src/app/api/_shared/utils/appError";
import { SessionDTO } from "@/src/domains/auth/auth.dto";
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";

export async function requireUserSessionSafe() {
  const res: {
    session?: SessionDTO;
    error?: Error;
  } = {
    session: undefined,
    error: undefined,
  };

  try {
    res.session = await requireUserSession();
    return res;
  } catch (e: unknown) {
    res.error = e instanceof Error ? e : new Error("Unknown error");
    return res;
  }
}

export async function requireUserSession() {
  const raw = (await cookies()).get("session")?.value;
  if (!raw) throw new AppError("Unauthorized", 401);

  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: { select: { id: true, username: true, email: true } } },
  });

  if (!session || session.expiresAt < new Date() || session.revokedAt)
    throw new AppError("Unauthorized", 401);

  return session;
}
