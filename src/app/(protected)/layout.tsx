import { redirect } from "next/navigation";
import UserInitializer from "../components/UserInitializer";
import CreateTransactionModal from "../components/CreateTransactionModal";
import { transactionsService } from "@/src/domains/transactions/transactions.service";
import SideBar from "../components/SideBar";
import { requireUserSessionSafe } from "@/src/shared/utils/requireUserSession";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await requireUserSessionSafe();
  if (!result.session) redirect("/auth");
  const user = result.session.user;

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
