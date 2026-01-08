import { requireUser } from "../shared/utils/requireUser";
import { transactionsService } from "../domains/transactions/transactions.service";
import UserBalance from "./components/UserBalance";
import UserTransactionsList from "./components/UserTransactionsList";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await requireUser();
  if (!user) redirect("/auth");
  const balance = await transactionsService.getUserBalance(user.id); // Одразу показати баланс при першому рендері

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

      <div className="flex-1 p-6 min-h-0">
        <h2 className="text-sm font-semibold mb-4 tracking-wider">
          Transactions
        </h2>
        <UserTransactionsList />
      </div>
    </>
  );
}
