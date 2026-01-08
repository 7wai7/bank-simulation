import { useMutation } from "@tanstack/react-query";
import { createTransactionApi, getUserBalanceApi } from "./transactions.api";
import { useTransactionsStore } from "./transactions.store";

export function useCreateTransaction() {
  return useMutation({
    mutationFn: createTransactionApi,
    onSuccess: (data) => {
      useTransactionsStore.getState().setBalance(data.balance);
    },
  });
}

export function useGetUserBalanceApi() {
  return useMutation({
    mutationFn: getUserBalanceApi,
    onSuccess: (data) => {
      useTransactionsStore.getState().setBalance(data.balance);
    },
  });
}
