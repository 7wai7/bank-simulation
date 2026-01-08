import { create } from "zustand";
import { LoginRequestDTO, RegisterRequestDTO, UserJwtDTO } from "./auth.dto";
import { loginApi, logoutApi, meApi, registerApi } from "./auth.api";

type State = {
  user: UserJwtDTO | null;
  setUser: (user: UserJwtDTO) => void;

  register: (data: RegisterRequestDTO) => Promise<UserJwtDTO>;
  login: (data: LoginRequestDTO) => Promise<UserJwtDTO>;
  logout: () => void;
  me: () => Promise<UserJwtDTO>;
};

export const useAuthStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  register: async (data) => {
    const user = await registerApi(data);
    set({ user });
    return user;
  },
  login: async (data) => {
    const user = await loginApi(data);
    set({ user });
    return user;
  },
  logout: async () => {
    await logoutApi();
    set({ user: null });
  },
  me: async () => {
    const user = await meApi();
    set({ user });
    return user;
  },
}));
