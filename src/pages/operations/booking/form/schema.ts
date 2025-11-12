import { z } from "zod";

export const bookingSchema = () => {
  return z.object({
    roomId: z.number({ required_error: "Room ID is required" }).optional(),
    customerId:  z.number({ required_error: "Customer ID is required" }),
    branchId:  z.number({ required_error: "Branch ID is required" }),
    bookingDuration: z.object({
        from: z.coerce.date({
        required_error: "Check-in date is required",
      }),
      to: z.coerce.date({
        required_error: "Check-out date is required",
      }),
    }),
    totalAmount: z
      .number({ required_error: "Total amount is required" })
      .nonnegative("Total amount must be positive"),
    netAmount: z
      .number({ required_error: "Net amount is required" })
      .nonnegative("Net amount must be positive"),
    discount: z.coerce
      .number()
      .nonnegative("Discount must be positive")
      .nullable()
      .optional(),
    tax:  z.coerce.number().nonnegative("Tax must be positive").nullable().optional(),
    notes: z.string().nullable().optional(),
    paymentAmount:  z.coerce
      .number()
      .nonnegative("Payment amount must be positive")
      .optional(),
    paymentModeId: z.number().optional(),
    paymentType: z
      .enum(["advance", "final", "refund", "other"])
      .nullable()
      .optional(),
    paymentRemarks: z.coerce.string().nullable().optional(),
  });
};
