import { SelectOption } from "@/components/core/DefaultSelect";
import { BaseApiResponse, BaseGetAllApiResponse } from "./common";

export enum BookingStatus {
  BOOKED = "booked",
  CHECKED_IN = "checked-in",
  CHECKED_OUT = "checked-out",
  CANCELLED = "cancelled",
}

export interface Booking {
  id: number;
  customerId: number;
  branchId: number;
  checkInDate: Date;
  checkOutDate: Date;
  actualCheckIn?: Date | null;
  actualCheckOut?: Date | null;
  status: "booked" | "checked-in" | "checked-out" | "cancelled";
  totalAmount: number;
  isRefunded?: boolean;
  amountPaid?: number | null;
  discount?: number | null;
  tax?: number | null;
  netAmount: number;
  notes?: string | null;
}

export interface NewBooking {
  customerId: number;
  branchId: number;
  checkInDate: Date;
  checkOutDate: Date;
  actualCheckIn?: Date | null;
  actualCheckOut?: Date | null;
  status?: "booked" | "checked-in" | "checked-out" | "cancelled";
  totalAmount: number;
  isRefunded?: boolean;
  amountPaid?: number | null;
  discount?: number | null;
  tax?: number | null;
  netAmount: number;
  notes?: string | null;
}

export interface NewCheckIn {
  notes?: string | null;
  paymentAmount?: number | null;
  paymentModeId?: number | null;
  paymentType?: string | null;
  paymentRemarks?: string | null;
}

export interface GetBooking {
  getBooking: Booking;
}

export interface GetBookingsResponse extends BaseGetAllApiResponse {
  bookings: {
    count: number;
    rows: Booking[] | [];
  };
}

export interface GetBookingResponse extends BaseApiResponse {
  booking: Booking;
}

export interface GetBookingsForSelectResponse extends BaseApiResponse {
  bookings: SelectOption[];
}
