import { create } from "zustand";

type State = {
  balance?: number;
  setBalance: (value: number) => void;

  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const useTransactionsStore = create<State>((set) => ({
  setBalance: (value) => set({ balance: value }),

  isOpenModal: false,
  setIsOpenModal: (value) => set({ isOpenModal: value }),
}));
