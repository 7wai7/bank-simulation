import { addSeconds } from "@/src/app/api/_shared/utils/date";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { AppError } from "../../app/api/_shared/utils/appError";
import { RegisterRequestSchema } from "../auth/auth.schemas";
import { mailService } from "../mail/mail.service";
import z from "zod";
import { env } from "@/src/shared/config/env";

class PasswordService {
  async sendMailToResetPassword(email: string) {
    try {
      const { link, username, parsedEmail } =
        await this.resetPasswordRequire(email);
      const fullLink = env.APP_URL + link;

      await mailService.sendResetPasswordMail({
        username,
        to: parsedEmail,
        url: fullLink,
        subject: "Reset password",
      });
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async resetPasswordRequire(email: string) {
    const parsed = RegisterRequestSchema.pick({ email: true }).safeParse({
      email,
    });
    if (!parsed.success) throw new Error();

    const { email: parsedEmail } = parsed.data;
    const { rawToken, tokenHash } = this.createTokenHash();

    const user = await prisma.user.findUnique({
      where: { email: parsedEmail },
    });
    if (!user) throw new Error();

    await prisma.passwordReset.updateMany({
      where: {
        user_id: user.id,
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    });

    await prisma.passwordReset.create({
      data: {
        tokenHash,
        expiresAt: addSeconds(60 * 15),
        user_id: user.id,
      },
    });

    const link = `/reset-password/${rawToken}`;
    return { link, username: user.username, parsedEmail };
  }

  async resetPasswordConfirm(token: string, newPassword: string) {
    const parsed = RegisterRequestSchema.pick({ password: true }).safeParse({
      password: newPassword,
    });

    if (!parsed.success)
      throw new AppError(parsed.error.issues[0].message, 400);

    const { password } = parsed.data;

    const parsedToken = z.uuid().safeParse(token);
    if (!parsedToken.success) throw new AppError("Invalid token", 400);

    const { tokenHash } = this.createTokenHash(parsedToken.data); // валідний UUID

    const hash = await bcrypt.hash(password, 10);
    const now = new Date();

    const passwordReset = await prisma.passwordReset.findUnique({
      where: { tokenHash },
    });

    if (!passwordReset || passwordReset.expiresAt < now || passwordReset.usedAt)
      throw new AppError("The token is invalid or has expired");

    await prisma.$transaction([
      prisma.user.update({
        where: { id: passwordReset.user_id },
        data: { hash_password: hash },
      }),
      prisma.session.updateMany({
        where: { user_id: passwordReset.user_id },
        data: { revokedAt: now },
      }),
      prisma.passwordReset.update({
        where: { id: passwordReset.id },
        data: { usedAt: now },
      }),
    ]);
  }

  private createTokenHash(rawToken?: string) {
    const raw = rawToken ?? crypto.randomUUID();
    const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");

    return { rawToken: raw, tokenHash };
  }
}

export const passwordService = new PasswordService();
