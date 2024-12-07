import { z } from "zod";

export const forgotPasswordSchema = () => {
  return z.object({
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
  });
};
