import { UserJwtDTO } from "../auth/auth.dto";

export type TransactionDTO = {
  id: number;
  from: UserJwtDTO;
  to: UserJwtDTO;

  amount: number;
  date: string;
};
