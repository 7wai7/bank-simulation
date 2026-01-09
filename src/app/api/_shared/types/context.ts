import NextRequestUser from "./nextRequestUser";

export type RouteContext<P = unknown> = {
  params: Promise<P>;
};

export type Handler<P = unknown> = (
  req: NextRequestUser,
  ctx: RouteContext<P>
) => Promise<Response>;
