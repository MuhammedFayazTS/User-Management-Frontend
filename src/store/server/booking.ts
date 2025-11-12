import { BaseApiResponse, DefaultQueryParams } from "@/types/common";
import {
  GetBookingResponse,
  GetBookingsForSelectResponse,
  GetBookingsResponse,
  NewBooking,
  NewCheckIn,
} from "@/types/booking";
import { useDelete, useGet, usePost, usePut } from "@/utils/reactQuery";

export const useGetBookings = (filters?: DefaultQueryParams) => {
  const { search, sort, page = "1", limit = "10" } = filters || {};
  return useGet<GetBookingsResponse>("bookings", "/bookings", {
    search,
    sort,
    page,
    limit,
  });
};

export const useGetBooking = (id?: number | null) => {
  return useGet<GetBookingResponse>("booking", `/bookings/${id}`, {}, !!id);
};

export const useGetBookingsForSelect = () => {
  return useGet<GetBookingsForSelectResponse>(
    "bookingsForSelect",
    `/bookings/select`
  );
};

export const useAddBooking = () => {
  return usePost<BaseApiResponse, NewBooking>("/bookings", "bookings");
};

export const useAddCheckIn = (id?: number) => {
  return usePost<BaseApiResponse, NewCheckIn>(
    id ? `/bookings/${id}/check-in` : "",
    "check-in",
  );
};


export const useUpdateBooking = () => {
  return usePut<BaseApiResponse, NewBooking>("/bookings", "bookings");
};

export const useDeleteBooking = () => {
  return useDelete<BaseApiResponse>(`/bookings`, "bookings");
};
