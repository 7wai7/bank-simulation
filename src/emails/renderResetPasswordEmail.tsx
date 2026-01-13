import { render } from "@react-email/render";
import { ResetPasswordEmail, ResetPasswordEmailProps } from "@/src/emails/ResetPasswordEmail";

export function renderResetPasswordEmail(props: ResetPasswordEmailProps) {
  return render(<ResetPasswordEmail {...props} />);
}
