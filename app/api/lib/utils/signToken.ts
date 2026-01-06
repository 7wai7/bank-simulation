import { env } from "@/app/config/env";
import { UserJwtDTO } from "@/app/lib/types/user.types";
import jwt, { SignOptions } from "jsonwebtoken";

export function signToken(user: UserJwtDTO) {
  const options: SignOptions = {};

  if (env.JWT_EXPIRES_IN) {
    options.expiresIn = env.JWT_EXPIRES_IN as Exclude<
      SignOptions["expiresIn"],
      undefined
    >;
  }

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    env.JWT_SECRET,
    options
  );
}
