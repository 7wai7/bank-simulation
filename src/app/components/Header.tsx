"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CreateTransactionButton from "./CreateTransactionButton";
import { useAuthStore } from "@/src/domains/auth/auth.store";
import LogoutBtn from "./LogoutBtn";

export default function Header() {
  return (
    <header
      className="
      relative
      bg-linear-to-b from-gray-900 to-gray-950
      px-6 py-4
      border-b border-gray-500/20
      flex justify-between items-center
      font-mono
    "
    >
      {/* Left */}
      <Link href="/" className="group">
        <h1
          className="
          text-xl font-bold tracking-wider
          text-gray-300
          group-hover:text-white
          transition-colors
        "
        >
          TOKEN<span className="text-gray-500">_</span>BANK
        </h1>
        <div className="text-[10px] text-gray-500 tracking-widest">
          SECURE LEDGER SIMULATION
        </div>
      </Link>

      {/* Right */}
      <HeaderRight/>

      {/* subtle scanline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-emerald-500/40 to-transparent" />
    </header>
  );
}

function HeaderRight() {
  const user = useAuthStore((s) => s.user);
  const isAuthPage = usePathname().startsWith("/auth");

  if (isAuthPage) return null;

  if (user)
    return (
      <>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-gray-500 tracking-widest">
              AUTHORIZED USER
            </div>
            <div className="text-sm text-gray-300">
              {user.username}{" "}
              <span className="text-gray-400 text-xs">{user.email}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <LogoutBtn />
            <CreateTransactionButton />
          </div>
        </div>
      </>
    );

  return (
    <Link
      href="/auth"
      className="text-sm text-gray-400 tracking-widest hover:text-white transition"
    >
      LOGIN
    </Link>
  );
}
