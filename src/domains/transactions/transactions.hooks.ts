import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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
      qc.setQueryData(
        ["user-transactions"],
        (prev: { pages: TransactionDTO[][] }) => {
          if (!prev) {
            return {
              pages: [[data.transaction]], // A single page with the new item
              pageParams: [undefined],
            };
          }

          const firstPage = [data.transaction, ...prev.pages[0]];
          const updatedPages = [firstPage, ...prev.pages.slice(1)];

          return {
            ...prev,
            pages: updatedPages,
          };
        }
      );
    },
  });
}

export function useGetUserTransactions() {
  return useInfiniteQuery<TransactionDTO[]>({
    queryKey: ["user-transactions"],
    queryFn: async ({ pageParam = null }) =>
      getUserTransactionsApi(pageParam as string | null),
    getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.id,
    initialPageParam: null,
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
