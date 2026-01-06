import z from "zod";

export const LoginRequestSchema = z.object({
  username: z
    .string()
    .min(3, { message: "The username must be longer than 3 characters." })
    .max(16, { message: "The username must be shorter than 16 characters." }),
  password: z
    .string()
    .min(6, { message: "The password must be longer than 6 characters." })
    .max(64, { message: "The password must be shorter than 64 characters." }),
});

export const RegisterRequestSchema = z
  .object({
    email: z.email(),
  })
  .merge(LoginRequestSchema);
