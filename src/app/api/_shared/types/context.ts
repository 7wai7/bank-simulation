import { UserDTO } from "@/src/domains/auth/auth.dto";
import { NextRequest } from "next/server";

export type RouteContext<P = unknown> = {
  params: Promise<P>;
  user?: UserDTO
};

export type Handler<P = unknown> = (
  req: NextRequest,
  ctx: RouteContext<P>
) => Promise<Response>;
