"use client";

import { useTransactionsStore } from "@/src/domains/transactions/transactions.store";

interface Props {
  initialBalance?: number;
}

export default function UserBalance({ initialBalance }: Props) {
  const balance = useTransactionsStore((s) => s.balance) ?? initialBalance ?? "Unknown";

  return (
    <p className="text-2xl font-bold">
      <span
        className="
                text-transparent
                bg-clip-text
                bg-[linear-gradient(90deg,#96c6b8_0%,#00d393,#96c6b8_100%)]
                bg-size-[200%_100%]
                animate-[scan_1s_linear_infinite]
              "
      >
        {balance}
      </span>{" "}
      <span className="text-xs text-gray-400">TOKENS</span>
    </p>
  );
}
