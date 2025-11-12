import { BookingStatus } from "@/types/booking";

export const getRelatedBookingStatuses = (status: BookingStatus): BookingStatus[] => {
    switch (status) {
      case BookingStatus.BOOKED:
        return [BookingStatus.CHECKED_OUT, BookingStatus.CANCELLED, "newRoomsWithoutAnyBooking" as unknown as BookingStatus]; //ffor adding new rooms
      case BookingStatus.CHECKED_IN:
        return [BookingStatus.BOOKED];
      case BookingStatus.CHECKED_OUT:
        return [BookingStatus.CHECKED_IN];
      case BookingStatus.CANCELLED:
        return [BookingStatus.BOOKED];
      default:
        return [];
    }
  };