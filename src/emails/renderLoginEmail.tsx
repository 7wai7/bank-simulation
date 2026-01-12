import { render } from "@react-email/render";
import { LoginConfirmationEmail } from "@/src/emails/LoginConfirmationEmail";

interface Props {
  username: string;
  confirmUrl: string;
}

export function renderLoginEmail(props: Props) {
  return render(<LoginConfirmationEmail {...props} />);
}
