import { z } from "zod";

const string255 = z.string().trim().max(255);
const optionalString255 = string255.optional();

export const branchSchema = () => {
  return z.object({
    id: z.number().optional(),
    name: z.string().trim().min(1, "Name is required").max(255),
    countryId: z.number(),
    address: optionalString255,
    city: optionalString255,
    state: optionalString255,
    postalCode: optionalString255,
    phone: optionalString255,
    email: z
      .string()
      .trim()
      .email()
      .min(1, {
        message: "Email is required",
      }),
  });
};
