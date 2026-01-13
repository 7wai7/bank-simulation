import { NextResponse } from "next/server";
import { AppError } from "./appError";
import { Handler } from "../types/context";
import { mapPrismaError } from "./mapPrismaError";

export const errorHandler =
  (handler: Handler): Handler =>
  async (req, ctx) => {
    try {
      try {
        return await handler(req, ctx);
      } catch (e: unknown) {
        mapPrismaError(e);
        console.error(e);
        throw e;
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
