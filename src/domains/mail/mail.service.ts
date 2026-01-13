import { renderResetPasswordEmail } from "@/src/emails/renderResetPasswordEmail";
import { ResetPasswordEmailProps } from "@/src/emails/ResetPasswordEmail";
import { env } from "@/src/shared/config/env";
import { Resend } from "resend";

class MailService {
  private resend = new Resend(env.RESEND_API);

  async sendResetPasswordMail(
    data: { to: string; subject: string } & ResetPasswordEmailProps
  ) {
    const html = await renderResetPasswordEmail(data);

    const { to, subject } = data;

    await this.resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });
  }
}

export const mailService = new MailService();
