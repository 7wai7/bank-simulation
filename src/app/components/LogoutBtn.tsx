"use client";

import { useAuthStore } from "@/src/domains/auth/auth.store";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const onLogout = async () => {
    await logout();
    router.replace("/auth");
  };

  return (
    <button
      onClick={onLogout}
      className="
        px-3 py-1 w-full
        border border-emerald-500/40
        text-emerald-400 text-xs tracking-widest
        hover:bg-emerald-500/10
        transition
      "
    >
      Logout
    </button>
  );
}
