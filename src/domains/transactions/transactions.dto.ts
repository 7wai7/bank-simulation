import z from "zod";
import { TransactionRequestSchema } from "./transactions.schemas";
import { UserDTO } from "../users/users.dto";

export type TransactionRequestDTO = z.infer<typeof TransactionRequestSchema>;

export type TransactionDTO = {
  id: number;
  from: UserDTO;
  to: UserDTO;
  date: string;
  amount: number;
  description?: string;
};
