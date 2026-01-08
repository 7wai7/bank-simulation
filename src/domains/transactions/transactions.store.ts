import { create } from "zustand";

type State = {
  balance: number | null;
  setBalance: (value: number) => void;

  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const useTransactionsStore = create<State>((set) => ({
  balance: null,
  setBalance: (value) => set({ balance: value }),

  isOpenModal: false,
  setIsOpenModal: (value) => set({ isOpenModal: value }),
}));
