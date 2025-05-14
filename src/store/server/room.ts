import { BaseApiResponse, DefaultQueryParams } from "@/types/common";
import { GetRoomResponse, GetRoomsForSelectResponse, GetRoomsResponse, NewRoom } from "@/types/room";
import { useDelete, useGet, usePost, usePut } from "@/utils/reactQuery";

export const useGetRooms = (filters?: DefaultQueryParams) => {
  const { search, sort, page = "1", limit = "10" } = filters || {};
  return useGet<GetRoomsResponse>("rooms", "/rooms", {
    search,
    sort,
    page,
    limit,
  });
};

export const useGetRoom = (id?: number | null) => {
  return useGet<GetRoomResponse>("room", `/rooms/${id}`, {}, !!id);
};

export const useGetRoomsForSelect = () => {
  return useGet<GetRoomsForSelectResponse>("roomsForSelect", `/rooms/select`);
};

export const useAddRoom = () => {
  return usePost<BaseApiResponse, NewRoom>("/rooms", "rooms");
};

export const useUpdateRoom = () => {
  return usePut<BaseApiResponse, NewRoom>("/rooms", "rooms");
};

export const useDeleteRoom = () => {
  return useDelete<BaseApiResponse>(`/rooms`, "rooms");
};
