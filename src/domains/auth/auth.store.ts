import { create } from "zustand";
import { LoginRequestDTO, RegisterRequestDTO } from "./auth.dto";
import { loginApi, logoutApi, meApi, registerApi } from "./auth.api";
import { UserDTO } from "../users/users.dto";

type State = {
  user: UserDTO | null;
  setUser: (user: UserDTO) => void;

  register: (data: RegisterRequestDTO) => Promise<UserDTO>;
  login: (data: LoginRequestDTO) => Promise<UserDTO>;
  logout: () => Promise<void>;
  me: () => Promise<UserDTO>;
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
