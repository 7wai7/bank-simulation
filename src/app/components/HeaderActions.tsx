"use client";

import CreateTransactionButton from "./CreateTransactionButton";
import { usePathname } from "next/navigation";

export default function HeaderActions() {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return <>{!isAuthPage && <CreateTransactionButton />}</>;
}
