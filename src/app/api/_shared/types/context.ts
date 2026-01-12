import { UserJwtDTO } from "@/src/domains/auth/auth.dto";
import NextRequestUser from "./nextRequestUser";

export type RouteContext<P = unknown> = {
  params: Promise<P>;
  user?: UserJwtDTO
};

export type Handler<P = unknown> = (
  req: NextRequestUser,
  ctx: RouteContext<P>
) => Promise<Response>;
