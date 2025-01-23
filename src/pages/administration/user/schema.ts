import { z } from "zod";

export const userSchema = () => {
  return z
    .object({
      firstName: z.string().trim().min(1, {
        message: "First name is required",
      }),
      lastName: z.string().trim().min(1, {
        message: "Last name is required",
      }),
      image: z.union([z.instanceof(File), z.null(),z.string()]).optional(),
      email: z.string().trim().email().min(1, {
        message: "Email is required",
      }),
      roleId: z.number().min(1, {
        message: "Role is required",
      }),
    })
};
