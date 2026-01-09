import z from "zod";
import { UserJwtDTO } from "../auth/auth.dto";
import { TransactionRequestSchema } from "./transactions.schemas";

export type TransactionRequestDTO = z.infer<typeof TransactionRequestSchema>;

export type TransactionDTO = {
  id: number;
  from: UserJwtDTO;
  to: UserJwtDTO;
  date: string;
  amount: number;
};