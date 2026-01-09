"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/src/domains/auth/auth.store";
import { UserJwtDTO } from "@/src/domains/auth/auth.dto";

export default function UserInitializer({
  user,
  children,
}: {
  user: UserJwtDTO;
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return <>{children}</>;
}
