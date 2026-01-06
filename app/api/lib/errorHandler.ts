import { NextResponse } from "next/server";
import { AppError } from "./utils/appError";
import { Handler } from "./types/context";
import { mapPrismaError } from "./utils/mapPrismaError";

export const errorHandler =
  (handler: Handler): Handler =>
  async (req, ctx) => {
    try {
      try {
        return await handler(req, ctx);
      } catch (e: unknown) {
        throw mapPrismaError(e);
      }
    } catch (e) {
      console.error(e);

      if (e instanceof AppError) {
        return NextResponse.json({ message: e.message }, { status: e.status });
      }

      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  };
