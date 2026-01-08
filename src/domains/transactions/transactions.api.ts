import api from "@/src/lib/axios";
import { fetcher } from "@/src/lib/fetcher";
import { TransactionDTO, TransactionRequestDTO } from "./transactions.dto";

export const createTransactionApi = async (data: TransactionRequestDTO) =>
  fetcher<TransactionDTO>(api.post("/api/transactions", data));