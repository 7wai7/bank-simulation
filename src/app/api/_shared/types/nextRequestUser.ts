import { UserJwtDTO } from "@/src/domains/auth/auth.dto";
import { NextRequest } from "next/server";

export default interface NextRequestUser extends NextRequest {
  user?: UserJwtDTO,
}