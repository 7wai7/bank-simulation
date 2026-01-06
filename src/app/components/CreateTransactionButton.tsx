"use client";

import { useState } from "react";
import CreateTransactionModal from "./CreateTransactionModal";

export default function CreateTransactionButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
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

      {open && <CreateTransactionModal onClose={() => setOpen(false)} />}
    </>
  );
}
