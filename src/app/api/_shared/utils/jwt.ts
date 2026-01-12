import { env } from "@/src/shared/config/env";
import { UserDTO } from "@/src/domains/auth/auth.dto";
import jwt, { SignOptions } from "jsonwebtoken";

export function signToken(user: UserDTO) {
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
