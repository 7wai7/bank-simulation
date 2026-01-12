import { useTransactionsStore } from "@/src/domains/transactions/transactions.store";

export default function CurrentBalance() {
  const balance = useTransactionsStore((s) => s.balance);

  return (
    <p className="px-6 mt-6 mb-3 text-xs text-gray-400 tracking-widest">
      Current balance:{" "}
      <span className="text-emerald-400 text-sm">{balance}</span>
    </p>
  );
}
