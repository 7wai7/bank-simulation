import { create } from "zustand";

type State = {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const useTransactionsStore = create<State>((set) => ({
  isOpenModal: false,
  setIsOpenModal: (value) => set({ isOpenModal: value }),
}));
