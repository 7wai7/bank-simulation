import z from "zod";

export const TransactionRequestSchema = z.object({
  to: z.email({ message: "Invalid email format" }),
  amount: z.number().gt(0, { message: "The amount must be greater than 0" }),
  description: z
    .string()
    .trim()
    .max(2000, {
      message: "The description cannot be longer than 2000 characters",
    })
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
});
