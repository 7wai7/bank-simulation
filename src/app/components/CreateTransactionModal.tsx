"use client";

import { TransactionRequestDTO } from "@/src/domains/transactions/transactions.dto";
import { useCreateTransaction } from "@/src/domains/transactions/transactions.hooks";
import { TransactionRequestSchema } from "@/src/domains/transactions/transactions.schemas";
import { useTransactionsStore } from "@/src/domains/transactions/transactions.store";
import clsx from "clsx";
import { useState } from "react";

type FormState = TransactionRequestDTO;

const initialState: FormState = {
  to: "",
  amount: 0,
  description: "",
};

export default function CreateTransactionModal() {
  const isOpen = useTransactionsStore((s) => s.isOpenModal);
  const setIsOpen = useTransactionsStore((s) => s.setIsOpenModal);

  const [state, setState] = useState<FormState>(initialState);
  const { error, mutate, isPending } = useCreateTransaction();
  const [schemaErr, setSchemaErr] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSchemaErr(null);

    const parsed = TransactionRequestSchema.safeParse(state);

    console.log(parsed.data);

    if (!parsed.success) {
      setSchemaErr(parsed.error.issues[0].message);
      return;
    }

    mutate(parsed.data);
  };

  if (!isOpen) return null;

  const err = error?.message ?? schemaErr;

  return (
    <div className="fixed inset-0 z-50 font-mono">
      {/* Backdrop */}
      <div
        className="
          absolute inset-0 bg-black/80 backdrop-blur-xs
          animate-[manifestation_300ms_ease_both]
        "
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div
        className="
          absolute right-0 top-0 h-full w-full md:w-130
          bg-gray-950 border-l border-gray-500/20
          flex flex-col
          animate-[transactions-modal_300ms_ease_both]
        "
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-500/20">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg text-gray-200 tracking-wider">
                NEW TRANSACTION
              </h2>
              <div className="text-xs text-gray-400 tracking-widest">
                ATOMIC TRANSFER
              </div>
            </div>
          </div>
        </div>

        <CurrentBalance />

        {/* Body */}
        <form className="flex flex-col flex-1 min-h-0" onSubmit={onSubmit}>
          <div className="flex-1 px-6 py-3 space-y-6 overflow-y-auto">
            <Field label="Recipient email">
              <input
                className={inputClass}
                placeholder="user@gmail.com"
                required
                value={state.to}
                onChange={(e) =>
                  setState({ ...state, to: e.currentTarget.value })
                }
              />
            </Field>

            <Field label="Amount">
              <input
                className={inputClass}
                placeholder="100"
                required
                value={state.amount}
                onChange={(e) =>
                  setState({
                    ...state,
                    amount: Math.max(0, Number(e.currentTarget.value) || 0),
                  })
                }
              />
            </Field>

            <Field label="Note (optional)">
              <textarea
                className={clsx(inputClass, "resize-none h-24")}
                placeholder="Payment description"
                value={state.description}
                onChange={(e) =>
                  setState({
                    ...state,
                    description: e.currentTarget.value,
                  })
                }
              />
            </Field>

            <div className="text-xs text-gray-400 leading-relaxed">
              <p>• Transaction will be recorded in the ledger</p>
              <p>• Balance is derived from ledger, not stored</p>
              <p>• Operation is atomic and irreversible</p>
            </div>
          </div>

          {err && (
            <p className="text-xs text-center text-red-400 border border-red-400/30 mx-6 mt-3 mb-4 py-2">
              {err}
            </p>
          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-500/20 text-sm flex gap-6">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 border border-gray-500/30 text-gray-400 py-2 hover:bg-gray-500/10 transition"
              type="button"
            >
              CANCEL
            </button>
            <button
              className="flex-1 border border-emerald-500/40 text-emerald-400 py-2 hover:bg-emerald-500/10 transition"
              type="submit"
            >
              {isPending ? "WAIT..." : "EXECUTE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* helpers */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 tracking-widest mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function CurrentBalance() {
  const balance = useTransactionsStore((s) => s.balance);

  return (
    <p className="px-6 mt-6 mb-3 text-xs text-gray-400 tracking-widest">
      Current balance:{" "}
      <span className="text-emerald-400 text-sm">{balance}</span>
    </p>
  );
}

const inputClass = `
  w-full
  bg-black
  border border-gray-500/30
  px-3 py-2
  text-sm text-gray-200
  placeholder:text-gray-600
  focus:outline-none
  focus:border-emerald-500/50
`;
