"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/src/domains/auth/auth.store";
import { UserJwtDTO } from "@/src/domains/auth/auth.dto";
import { useTransactionsStore } from "@/src/domains/transactions/transactions.store";

export default function UserInitializer({
  user,
  initialBalance,
  children,
}: {
  user: UserJwtDTO;
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
