import { z } from "zod";

export const groupSchema = () => {
  return z.object({
    name: z.string().trim().min(1, {
      message: "Name is required",
    }),
    description: z.string().trim().optional(),
    roles: z.array(z.object({
      id: z.number(),  // Assuming each permission has an 'id' as a number
      name: z.string().optional(),  // Optionally, you can add other fields
    })).optional(),
    users: z.array(z.object({
      id: z.number(),  // Assuming each permission has an 'id' as a number
    })).optional(),
  });
};
