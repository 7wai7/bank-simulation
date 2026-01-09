import { requireUser } from "@/src/shared/utils/requireUser";
import { redirect } from "next/navigation";
import UserInitializer from "../components/UserInitializer";
import CreateTransactionModal from "../components/CreateTransactionModal";
import { transactionsService } from "@/src/domains/transactions/transactions.service";
import SideBar from "../components/SideBar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  if (!user) redirect("/auth");

  const balance = await transactionsService.getUserBalance(user.id);

  return (
    <UserInitializer user={user} initialBalance={balance}>
      <div className="flex flex-row flex-1 min-h-0 w-full h-full pl-20">
        <SideBar user={user} />
        {children}
      </div>
      <CreateTransactionModal />
    </UserInitializer>
  );
}
