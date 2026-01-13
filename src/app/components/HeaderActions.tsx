"use client";

import CreateTransactionButton from "./CreateTransactionButton";
import { usePathname } from "next/navigation";

export default function HeaderActions() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return <CreateTransactionButton />;
}
