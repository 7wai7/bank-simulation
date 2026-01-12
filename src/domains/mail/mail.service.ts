import { renderLoginEmail } from "@/src/emails/renderLoginEmail";
import { env } from "@/src/shared/config/env";
import { Resend } from "resend";

class MailService {
  resend = new Resend(env.RESEND_API);

  async sendMail() {
    console.log("send mail");
    const html = await renderLoginEmail({
      username: "username",
      confirmUrl: "url",
    });

    await this.resend.emails.send({
      from: "onboarding@resend.dev",
      to: "nazarkalataluk@gmail.com",
      subject: "Hello user",
      html,
    });
  }
}

export const mailService = new MailService();
