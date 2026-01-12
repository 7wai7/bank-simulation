import z from "zod";
import { UserDTO } from "../auth/auth.dto";
import { TransactionRequestSchema } from "./transactions.schemas";

export type TransactionRequestDTO = z.infer<typeof TransactionRequestSchema>;

export type TransactionDTO = {
  id: number;
  from: UserDTO;
  to: UserDTO;
  date: string;
  amount: number;
  description?: string;
};
