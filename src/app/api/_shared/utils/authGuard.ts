import { AppError } from "./appError";
import { Handler } from "../types/context";
import { requireUser } from "@/src/shared/utils/requireUser";

export const authGuard =
  (handler: Handler): Handler =>
  async (req, ctx) => {
    const user = await requireUser();
    if (!user) throw new AppError("Unauthorized", 401);

    req.user = user;
    return handler(req, ctx);
  };
