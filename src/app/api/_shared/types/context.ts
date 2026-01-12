import { UserDTO } from "@/src/domains/auth/auth.dto";
import NextRequestUser from "./nextRequestUser";

export type RouteContext<P = unknown> = {
  params: Promise<P>;
  user?: UserDTO
};

export type Handler<P = unknown> = (
  req: NextRequestUser,
  ctx: RouteContext<P>
) => Promise<Response>;
