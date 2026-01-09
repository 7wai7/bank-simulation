"use client";

import { useTransactionsStore } from "@/src/domains/transactions/transactions.store";
import { useEffect, useRef, useState } from "react";

interface Props {
  initialBalance: number;
}

export default function UserBalance({ initialBalance }: Props) {
  const storeBalance = useTransactionsStore((s) => s.balance);
  const targetBalance = !storeBalance ? initialBalance : storeBalance;

  const [displayBalance, setDisplayBalance] = useState(targetBalance);

  const rafRef = useRef<number | null>(null);
  const previousBalanceRef = useRef(targetBalance);

  useEffect(() => {
    useTransactionsStore.setState({ balance: initialBalance });
  }, [initialBalance]);

  useEffect(() => {
    const start = previousBalanceRef.current;
    const end = targetBalance;

    if (start === end) return;

    const duration = 2000; // ms
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);

      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const value = start + (end - start) * eased;
      setDisplayBalance(Math.round(value));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        previousBalanceRef.current = end;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetBalance]);

  return (
    <p className="text-2xl font-bold">
      <span
        className="
          text-transparent
          bg-clip-text
          bg-[linear-gradient(90deg,#96c6b8_0%,#00d393,#96c6b8_100%)]
          bg-size-[200%_100%]
          animate-[scan_1.2s_linear_infinite]
        "
      >
        {displayBalance.toLocaleString("uk-UA")}
      </span>
      <span className="ml-1 text-xs text-gray-400">TOKENS</span>
    </p>
  );
}
