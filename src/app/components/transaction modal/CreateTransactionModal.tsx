"use client";

import clsx from "clsx";
import useTransactionModal from "../../hooks/useTransactionModal.hook";
import UsersListTip from "../UsersListTip";
import Field from "./Field";
import CurrentBalance from "./CurrentBalance";
import { useRef, useState } from "react";
import { UserDTO } from "@/src/domains/auth/auth.dto";

export default function CreateTransactionModal() {
  const { isOpen, setIsOpen, state, setState, onSubmit, isPending, error } =
    useTransactionModal();

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const onUseUser = (user: UserDTO) => {
    setState({ ...state, to: user.email });
    setIsEmailFocused(false);
  };

  if (!isOpen) return null;

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
              <UsersListTip
                email={state.to}
                onUseUser={onUseUser}
                isOpen={isEmailFocused}
              >
                <input
                  ref={emailInputRef}
                  className={inputClass}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={(e) => {
                    if (!e.relatedTarget?.closest("[data-users-list]"))
                      setIsEmailFocused(false);
                  }}
                  placeholder="user@gmail.com"
                  required
                  value={state.to}
                  onChange={(e) =>
                    setState({ ...state, to: e.currentTarget.value })
                  }
                />
              </UsersListTip>
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

          {error && (
            <p className="text-xs text-center text-red-400 border border-red-400/30 mx-6 mt-3 mb-4 py-2">
              {error}
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
