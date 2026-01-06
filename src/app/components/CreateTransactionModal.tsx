"use client";

import clsx from "clsx";

interface Props {
  onClose: () => void;
}

export default function CreateTransactionModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 font-mono">
      {/* Backdrop */}
      <div
        className="
          absolute inset-0 bg-black/80 backdrop-blur-xs
          animate-[manifestation_300ms_ease_both]
        "
        onClick={onClose}
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

        {/* Body */}
        <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
          <Field label="Recipient email">
            <input className={inputClass} placeholder="user@gmail.com" />
          </Field>

          <Field label="Amount">
            <input className={inputClass} placeholder="100" />
          </Field>

          <Field label="Note (optional)">
            <textarea
              className={clsx(inputClass, "resize-none h-24")}
              placeholder="Payment description"
            />
          </Field>

          <div className="text-xs text-gray-400 leading-relaxed">
            <p>• Transaction will be recorded in the ledger</p>
            <p>• Balance is derived from ledger, not stored</p>
            <p>• Operation is atomic and irreversible</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-500/20 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-500/30 text-gray-400 py-2 hover:bg-gray-500/10 transition"
          >
            CANCEL
          </button>
          <button className="flex-1 border border-emerald-500/40 text-emerald-400 py-2 hover:bg-emerald-500/10 transition">
            EXECUTE
          </button>
        </div>
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
