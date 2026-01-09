import { transactionsService } from "@/src/domains/transactions/transactions.service";
import { requireUser } from "@/src/shared/utils/requireUser";
import UserBalance from "../components/UserBalance";
import UserTransactionsList from "../components/UserTransactionsList";

export default async function Home() {
  const user = await requireUser(); // Получити користувача через jwt
  const balance = await transactionsService.getUserBalance(user!.id); // Одразу показати баланс при першому рендері

  return (
    <main className="page w-full ml-10 min-h-0">
      <div className="flex flex-col m-0">
        <div className="p-6">
          <h2 className="text-sm font-semibold mb-2 tracking-wider">
            Your Balance
          </h2>
          <UserBalance initialBalance={balance} />
        </div>
      </div>

      <hr className="h-0 block m-0 border-t border-gray-500/20" />

      <div className="flex-1 min-h-0 p-6 overflow-hidden">
        <h2 className="text-sm font-semibold mb-4 tracking-wider">
          Transactions
        </h2>
        <UserTransactionsList />
      </div>
    </main>
  );
}
