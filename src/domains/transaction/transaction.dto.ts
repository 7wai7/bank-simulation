import { UserJwtDTO } from "../auth/auth.dto";

export type TransactionRequestDTO = {
  from: UserJwtDTO;
  to: UserJwtDTO;
  amount: number;
};

export type TransactionDTO = {
  id: number;
  date: string;
} & TransactionRequestDTO;
