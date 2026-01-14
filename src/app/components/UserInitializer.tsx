"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/src/domains/auth/auth.store";
import { useTransactionsStore } from "@/src/domains/transactions/transactions.store";
import { UserDTO } from "@/src/domains/users/users.dto";

export default function UserInitializer({
  user,
  initialBalance,
  children,
}: {
  user: UserDTO;
  initialBalance: number;
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const setBalance = useTransactionsStore((s) => s.setBalance);

  useEffect(() => {
    setUser(user);
    setBalance(initialBalance);
  }, [initialBalance, setBalance, setUser, user]);

  return <>{children}</>;
}
