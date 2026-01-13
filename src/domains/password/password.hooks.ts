import { useMutation } from "@tanstack/react-query";
import { sendMailToResetPasswordApi } from "./password.api";

export function useSendMailToResetPassword() {
  return useMutation({
    mutationFn: sendMailToResetPasswordApi,
  });
}
