import { z } from "zod";

export const roomTypeSchema = () => {
  return z.object({
    name: z.string().min(1, "Name is required"),
    branchId: z.number(),
    price: z.preprocess(val => Number(val), z.number()),
    description: z.string().optional(),
  });
};
