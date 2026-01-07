"use client";

import { useTransactionsStore } from "@/src/domains/transactions/transactions.store";

export default function CreateTransactionButton() {
  const setIsOpen = useTransactionsStore((s) => s.setIsOpenModal);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
          px-3 py-1
          border border-emerald-500/40
          text-emerald-400 text-xs tracking-widest
          hover:bg-emerald-500/10
          transition
        "
      >
        + CREATE TX
      </button>
    </>
  );
}
