import { addSeconds } from "@/src/app/api/_shared/utils/date";
import { getClientIp } from "@/src/app/api/_shared/utils/getClientIp";
import { prisma } from "@/src/lib/prisma";
import { env } from "@/src/shared/config/env";
import { requireUserSessionSafe } from "@/src/shared/utils/requireUserSession";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextRequest } from "next/server";
import { AppError } from "../../app/api/_shared/utils/appError";
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  SessionDTO
} from "./auth.dto";
import { LoginRequestSchema, RegisterRequestSchema } from "./auth.schemas";

class AuthService {
  async register(req: NextRequest, data: RegisterRequestDTO) {
    const parsed = RegisterRequestSchema.safeParse(data);
    if (!parsed.success)
      throw new AppError(parsed.error.issues[0].message, 400);

    const { username, email, password } = parsed.data;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new AppError("User already exists", 409);

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, hash_password: hash },
    });

    return await this.createSession(req, user.id);
  }

  async login(req: NextRequest, data: LoginRequestDTO) {
    const parsed = LoginRequestSchema.safeParse(data);
    if (!parsed.success)
      throw new AppError(parsed.error.issues[0].message, 400);

    const { username, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new AppError("User not found", 404);

    const ok = await bcrypt.compare(password, user.hash_password);
    if (!ok) throw new AppError("Invalid password", 400);

    await this.revokeCurrentSession();
    return await this.createSession(req, user.id);
  }

  // TODO:
  // will start working soon
  async changePassword(req: NextRequest, userId: number, newPassword: string) {
    const parsed = RegisterRequestSchema.pick({ password: true }).safeParse({
      password: newPassword,
    });

    if (!parsed.success)
      throw new AppError(parsed.error.issues[0].message, 400);

    const { password } = parsed.data;

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: { id: userId },
      data: { hash_password: hash },
    });

    await this.revokeCurrentSession();
    return await this.createSession(req, user.id);
  }

  async createSession(
    req: NextRequest,
    userId: number
  ): Promise<[SessionDTO, string]> {
    const raw = crypto.randomUUID();
    const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");

    const session = await prisma.session.create({
      data: {
        tokenHash,
        user_id: userId,
        expiresAt: addSeconds(env.SESSION_EXPIRES_IN_SECONDS),
        ip: await getClientIp(),
        userAgent: req.headers.get("user-agent"),
      },
      include: {
        user: { select: { id: true, username: true, email: true } },
      },
    });

    return [session, raw];
  }

  async revokeCurrentSession() {
    const existSession = await requireUserSessionSafe();
    if (existSession.session) {
      await prisma.session.update({
        where: { id: existSession.session.id },
        data: { revokedAt: new Date() },
      });
    }
  }
}

export const authService = new AuthService();
