import api from "@/src/lib/axios";
import { fetcher } from "@/src/lib/fetcher";
import { TransactionDTO, TransactionRequestDTO } from "./transactions.dto";

export const createTransactionApi = async (data: TransactionRequestDTO) =>
  fetcher<{ transaction: TransactionDTO; balance: number }>(
    api.post("/api/transactions", data)
  );

export const getUserBalanceApi = async () =>
  fetcher<{ balance: number }>(api.get("/api/transactions"));
