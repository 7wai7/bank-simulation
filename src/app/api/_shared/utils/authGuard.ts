import { Handler } from "../types/context";
import { requireUserSession } from "@/src/shared/utils/requireUserSession";

export const authGuard =
  (handler: Handler): Handler =>
  async (req, ctx) => {
    const session = await requireUserSession();

    req.user = session.user;
    return handler(req, ctx);
  };
