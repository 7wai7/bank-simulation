import { TransactionRequestDTO } from "@/src/domains/transactions/transactions.dto";
import { useCreateTransaction } from "@/src/domains/transactions/transactions.hooks";
import { TransactionRequestSchema } from "@/src/domains/transactions/transactions.schemas";
import { useTransactionsStore } from "@/src/domains/transactions/transactions.store";
import { useState } from "react";

type FormState = TransactionRequestDTO;

const initialState: FormState = {
  to: "",
  amount: 0,
  description: "",
};

export default function useTransactionModal() {
  const isOpen = useTransactionsStore((s) => s.isOpenModal);
  const setIsOpen = useTransactionsStore((s) => s.setIsOpenModal);

  const [state, setState] = useState<FormState>(initialState);
  const { error, mutate, isPending } = useCreateTransaction();
  const [schemaErr, setSchemaErr] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSchemaErr(null);

    const parsed = TransactionRequestSchema.safeParse(state);

    if (!parsed.success) {
      setSchemaErr(parsed.error.issues[0].message);
      return;
    }

    mutate(parsed.data);
  };

  const err = error?.message ?? schemaErr;

  return {
    isOpen,
    setIsOpen,
    state,
    setState,
    onSubmit,
    isPending,
    error: err,
  };
}
