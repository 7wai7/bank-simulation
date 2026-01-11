"use client";

import { useAuthStore } from "@/src/domains/auth/auth.store";
import { useGetUserTransactions } from "@/src/domains/transactions/transactions.hooks";
import clsx from "clsx";
import { useMemo } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.hook";

export default function UserTransactionsList() {
  const user = useAuthStore((s) => s.user);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetUserTransactions();

  const transactions = useMemo(() => data?.pages.flat() ?? [], [data]);

  const loadMoreRef = useInfiniteScroll(
    fetchNextPage,
    Boolean(hasNextPage && !isFetchingNextPage)
  );

  return (
    <ul className="flex flex-col gap-3 overflow-y-auto h-full pr-3 pb-6">
      {transactions.map((tx) => {
        const isOutgoing = tx.from.id === user!.id;

        return (
          <li
            key={tx.id}
            className={clsx(
              `
              items-center justify-between gap-4
              px-4 py-3 rounded-md
              border border-gray-500/20
              bg-black/30
              hover:bg-gray-800/40
              transition-colors
              grid grid-cols-[minmax(100px,0.5fr)_minmax(100px,2fr)_minmax(100px,0.5fr)]
              `,
              isOutgoing
                ? "border-l-4 border-l-red-500/60"
                : "border-l-4 border-l-emerald-500/60"
            )}
          >
            <div className="flex flex-col">
              <span className="text-xs tracking-wide text-gray-400">
                {isOutgoing ? "SENT TO" : "RECEIVED FROM"}
              </span>
              <span className="text-sm text-gray-200 truncate max-w-55">
                {isOutgoing ? tx.to.email : tx.from.email}
              </span>
            </div>
            <p className="text-xs text-gray-300 truncate">{tx.description ?? "-"}</p>

            <div
              className={clsx(
                "text-sm font-mono tracking-wide text-right",
                isOutgoing ? "text-red-400" : "text-emerald-400"
              )}
            >
              {isOutgoing ? "-" : "+"}
              {tx.amount}
              <span className="ml-1 text-[10px] text-gray-400">TOKENS</span>
            </div>
          </li>
        );
      })}

      {/* Sentinel */}
      <div ref={loadMoreRef} className="h-6" />

      {isFetchingNextPage && (
        <li className="text-xs text-gray-500 text-center py-2">
          Loading more transactions…
        </li>
      )}

      {!hasNextPage && transactions.length > 0 && (
        <li className="text-xs text-gray-600 text-center py-2">
          No more transactions
        </li>
      )}
    </ul>
  );
}
