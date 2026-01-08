import z from "zod";

export const TransactionRequestSchema = z.object({
  to: z.email({ message: "Invalid email format" }),
  amount: z.number().gt(0, {message: "The amount must be greater than 0"}),
});
