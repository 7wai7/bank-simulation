import { env } from "@/src/shared/config/env";
import { headers } from "next/headers";

export async function getClientIp() {
  if(env.NODE_ENV === "test") return "127.0.0.1";

  const h = await headers();

  const candidates = [
    h.get("cf-connecting-ip"),
    h.get("x-forwarded-for")?.split(",")[0],
    h.get("x-real-ip"),
  ];

  return candidates.find(Boolean)?.trim() ?? null;
}
