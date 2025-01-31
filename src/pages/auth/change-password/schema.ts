import { z } from "zod";

export const changePasswordSchema = () => {
  return z
    .object({
      oldPassword: z.string().trim().min(1, {
        message: "Old Password is required",
      }),
      password: z.string().trim().min(1, {
        message: "Password is required",
      }),
      confirmPassword: z.string().trim().min(1, {
        message: "Confirm password is required",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    })
    .refine((data) => data.password !== data.oldPassword, {
      message: "New password cannot be the same as the old password",
      path: ["password"],
    });
};
