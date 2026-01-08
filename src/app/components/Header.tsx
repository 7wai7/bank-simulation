"use client";

import Link from "next/link";
import CreateTransactionButton from "./CreateTransactionButton";
import { useAuthStore } from "@/src/domains/auth/auth.store";

export default function Header() {
  const user = useAuthStore((s) => s.user);

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
      {user ? (
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-gray-500 tracking-widest">
              AUTHORIZED USER
            </div>
            <div className="text-sm text-gray-300">{user.username}</div>
          </div>

          <CreateTransactionButton />
        </div>
      ) : (
        <Link
          href="/auth"
          className="text-sm text-gray-400 tracking-widest hover:text-white transition"
        >
          LOGIN
        </Link>
      )}

      {/* subtle scanline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-emerald-500/40 to-transparent" />
    </header>
  );
}
