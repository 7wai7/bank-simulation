import { requireUser } from "@/src/shared/utils/requireUser";
import { redirect } from "next/navigation";
import UserInitializer from "../components/UserInitializer";
import CreateTransactionModal from "../components/CreateTransactionModal";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  if (!user) redirect("/auth");

  return (
    <UserInitializer user={user}>
      {children}
      <CreateTransactionModal />
    </UserInitializer>
  );
}
