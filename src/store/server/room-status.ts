import { BaseApiResponse, DefaultQueryParams } from "@/types/common";
import { GetRoomStatusResponse, GetRoomStatusesForSelectResponse, GetRoomStatusesResponse, NewRoomStatus } from "@/types/room-status";
import { useDelete, useGet, usePost, usePut } from "@/utils/reactQuery";

export const useGetRoomStatuses = (filters?: DefaultQueryParams) => {
  const { search, sort, page = "1", limit = "10" } = filters || {};
  return useGet<GetRoomStatusesResponse>("roomStatuses", "/room-statuses", {
    search,
    sort,
    page,
    limit,
  });
};

export const useGetRoomStatus = (id?: number | null) => {
  return useGet<GetRoomStatusResponse>("room-status", `/room-statuses/${id}`, {}, !!id);
};

export const useGetRoomStatusesForSelect = () => {
  return useGet<GetRoomStatusesForSelectResponse>("roomStatusesForSelect", `/room-statuses/select`);
};

export const useAddRoomStatus = () => {
  return usePost<BaseApiResponse, NewRoomStatus>("/room-statuses", "roomStatuses");
};

export const useUpdateRoomStatus = () => {
  return usePut<BaseApiResponse, NewRoomStatus>("/room-statuses", "roomStatuses");
};

export const useDeleteRoomStatus = () => {
  return useDelete<BaseApiResponse>(`/room-statuses`, "roomStatuses");
};
