import { addSeconds } from "@/src/app/api/_shared/utils/date";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextRequest } from "next/server";
import { AppError } from "../../app/api/_shared/utils/appError";
import { RegisterRequestSchema } from "../auth/auth.schemas";
import { authService } from "../auth/auth.service";
import { mailService } from "../mail/mail.service";

class PasswordService {
  async sendMailToResetPassword({
    email,
    origin,
  }: {
    email: string;
    origin: string;
  }) {
    const { link, username, parsedEmail } =
      await this.resetPasswordRequire(email);
    const fullLink = origin + link;
    console.log("fullLink", fullLink);

    await mailService.sendResetPasswordMail({
      username,
      to: parsedEmail,
      url: fullLink,
      subject: "Reset password",
    });
  }

  async resetPasswordRequire(email: string) {
    const parsed = RegisterRequestSchema.pick({ email: true }).safeParse({
      email,
    });
    if (!parsed.success) throw new Error();

    const { email: parsedEmail } = parsed.data;

    const rawToken = crypto.randomUUID();
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const user = await prisma.user.findUnique({
      where: { email: parsedEmail },
    });
    if (!user) throw new Error();

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

    await authService.revokeCurrentSession();
    return await authService.createSession(req, user.id);
  }
}

export const passwordService = new PasswordService();
