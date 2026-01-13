import { useMutation } from "@tanstack/react-query";
import { resetPasswordConfirmApi, sendMailToResetPasswordApi } from "./password.api";

export function useSendMailToResetPassword() {
  return useMutation({
    mutationFn: sendMailToResetPasswordApi,
  });
}

export function useResetPasswordConfirm() {
  return useMutation({
    mutationFn: resetPasswordConfirmApi,
  });
}
