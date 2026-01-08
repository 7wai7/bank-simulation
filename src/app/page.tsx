import clsx from "clsx";
import { TransactionDTO } from "../domains/transactions/transactions.dto";
import { requireUser } from "../shared/utils/requireUser";
import { transactionsService } from "../domains/transactions/transactions.service";
import UserBalance from "./components/UserBalance";

export default async function Home() {
  const user = await requireUser();
  const transactions: TransactionDTO[] = [];

  const balance = await transactionsService.getUserBalance(user!.id);

  return (
    <>
      <div className="flex flex-col m-0">
        <div className="p-6">
          <h2 className="text-sm font-semibold mb-2 tracking-wider">
            Your Balance
          </h2>
          <UserBalance initialBalance={balance} />
        </div>
      </div>

      <hr className="h-0 block m-0 border-t border-gray-500/20" />

      <div className="flex-1 p-6">
        <h2 className="text-sm font-semibold mb-4 tracking-wider">
          Recent Transactions
        </h2>
        <ul className="space-y-2 overflow-y-auto">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className={clsx(
                `flex justify-between py-2 border-b border-gray-500/20 text-sm transition-colors duration-300 hover:bg-gray-700 rounded-md px-2`,
                tx.from.id === user!.id ? "text-red-400" : "text-green-400"
              )}
            >
              <span>
                {tx.from.id === user!.id
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
    </>
  );
}
