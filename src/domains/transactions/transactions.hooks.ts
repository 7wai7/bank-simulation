import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransactionApi,
  getUserBalanceApi,
  getUserTransactionsApi,
} from "./transactions.api";
import { useTransactionsStore } from "./transactions.store";
import { TransactionDTO } from "./transactions.dto";

export function useCreateTransaction() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTransactionApi,
    onSuccess: (data) => {
      useTransactionsStore.getState().setBalance(data.balance);
      useTransactionsStore.getState().setIsOpenModal(false);
      qc.setQueryData<TransactionDTO[]>(["user-transactions"], (prev) =>
        prev ? [data.transaction, ...prev] : [data.transaction]
      );
    },
  });
}

export function useGetUserTransactions() {
  return useQuery({
    queryKey: ["user-transactions"],
    queryFn: getUserTransactionsApi,
  });
}

export function useGetUserBalance() {
  return useMutation({
    mutationFn: getUserBalanceApi,
    onSuccess: (data) => {
      useTransactionsStore.getState().setBalance(data.balance);
    },
  });
}
