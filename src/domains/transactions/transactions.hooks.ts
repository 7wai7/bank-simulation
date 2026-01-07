import { useMutation } from "@tanstack/react-query";
import { createTransactionApi } from "./transactions.api";

export function useCreateTransaction() {
  return useMutation({
    mutationFn: createTransactionApi,
  });
}
