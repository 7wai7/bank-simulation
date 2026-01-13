import api from "@/src/lib/axios";
import { fetcher } from "@/src/lib/fetcher";

export const sendMailToResetPasswordApi = async (email: string) =>
  fetcher(api.post("/api/password/reset/request", { email }));

export const resetPasswordConfirmApi = async (data: {
  token: string;
  password: string;
}) => fetcher(api.post("/api/password/reset/confirm", data));
