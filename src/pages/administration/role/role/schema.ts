import { z } from "zod";

export const roleSchema = () => {
  return z.object({
    name: z.string().trim().min(1, {
      message: "Name is required",
    }),
    description: z.string().trim().optional(),
    permissions: z.array(z.number()).optional(),
  });
};
