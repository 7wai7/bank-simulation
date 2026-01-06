import api from "@/src/lib/axios";
import { fetcher } from "@/src/lib/fetcher";
import { LoginRequestDTO, RegisterRequestDTO, UserJwtDTO } from "./auth.dto";

export const loginApi = async (data: LoginRequestDTO) =>
  fetcher<UserJwtDTO>(api.post("/api/auth/login", data));

export const registerApi = async (data: RegisterRequestDTO) =>
  fetcher<UserJwtDTO>(api.post("/api/auth/register", data));

export const logoutApi = async () => fetcher(api.post("/api/auth/logout"));

export const meApi = async () => fetcher<UserJwtDTO>(api.get("/api/auth/me"));
