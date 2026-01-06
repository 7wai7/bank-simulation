"use client";

import { useState } from "react";
import { UserJwtDTO } from "./lib/types/user.types";
import clsx from "clsx";

interface Transaction {
  id: number;
  type: "send" | "receive";
  amount: number;
  date: string;
  to?: string;
  from?: string;
}

const initialTransactions: Transaction[] = [
  { id: 1, type: "receive", amount: 200, date: "2026-01-05", from: "Alice" },
  { id: 2, type: "send", amount: 50, date: "2026-01-04", to: "Bob" },
  { id: 3, type: "receive", amount: 150, date: "2026-01-03", from: "Charlie" },
];

const user: UserJwtDTO = {
  id: 1,
  username: "User",
  email: "email@gmail.com",
};

export default function Home() {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [sendAmount, setSendAmount] = useState(50);
  const [sendTo, setSendTo] = useState("Bob");

  const sendTokens = () => {
    if (sendAmount <= 0 || sendAmount > balance) return;
    const newTx: Transaction = {
      id: transactions.length + 1,
      type: "send",
      amount: sendAmount,
      date: new Date().toISOString().split("T")[0],
      to: sendTo,
    };
    setTransactions([newTx, ...transactions]);
    setBalance((prev) => prev - sendAmount);
    setSendAmount(0);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white font-mono flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-400">Token Bank</h1>
        <div className="text-sm text-gray-300">{user.username}</div>
      </header>

      <div className="flex flex-1 p-6 space-x-6">
        {/* Left panel: Balance + Send form */}
        <div className="flex flex-col w-1/3 space-y-6">
          <div className="rounded-sm p-6 shadow-lg bg-gray-900 border border-gray-600">
            <h2 className="text-sm font-semibold mb-2 tracking-wider text-gray-300">
              Your Balance
            </h2>
            <p className="text-2xl font-bold text-green-400">
              {balance} <span className="text-xs text-gray-400">TOKENS</span>
            </p>
          </div>

          {/* Send tokens */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-500 flex flex-col space-y-4">
            <h2 className="text-sm font-semibold text-gray-300 tracking-wider">
              Send Tokens
            </h2>
            <input
              type="text"
              placeholder="Recipient"
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-400"
            />
            <input
              type="number"
              placeholder="Amount"
              value={sendAmount}
              onChange={(e) => setSendAmount(Number(e.target.value))}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-400"
            />
            <button
              onClick={sendTokens}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl shadow-lg transition-all duration-300"
            >
              Send
            </button>
          </div>
        </div>

        {/* Right panel: Transactions */}
        <div className="flex-1 bg-gray-900 border border-gray-600 rounded-sm p-6 shadow-lg">
          <h2 className="text-sm font-semibold mb-4 tracking-wider text-gray-300">
            Recent Transactions
          </h2>
          <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className={clsx(
                  `flex justify-between py-2 border-b border-gray-700 text-sm transition-colors duration-300 hover:bg-gray-700 rounded-md px-2`,
                  tx.type === "send" ? "text-red-400" : "text-green-400"
                )}
              >
                <span>
                  {tx.type === "send"
                    ? `Sent to ${tx.to}`
                    : `Received from ${tx.from}`}
                </span>
                <span>
                  {tx.amount} <span className="text-[11px]">TOKENS</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 px-6 py-4 text-gray-400 text-sm text-center">
        Token Bank Demo - All data is simulated
      </footer>
    </main>
  );
}
