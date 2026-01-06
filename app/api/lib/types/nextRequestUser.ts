import { UserJwtDTO } from "@/app/lib/types/user.types";
import { NextRequest } from "next/server";

export default interface NextRequestUser extends NextRequest {
  user?: UserJwtDTO,
}