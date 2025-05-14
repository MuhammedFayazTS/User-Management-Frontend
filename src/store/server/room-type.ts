import { BaseApiResponse, DefaultQueryParams } from "@/types/common";
import { GetRoomTypeResponse, GetRoomTypesForSelectResponse, GetRoomTypesResponse, NewRoomType } from "@/types/room-type";
import { useDelete, useGet, usePost, usePut } from "@/utils/reactQuery";

export const useGetRoomTypes = (filters?: DefaultQueryParams) => {
  const { search, sort, page = "1", limit = "10" } = filters || {};
  return useGet<GetRoomTypesResponse>("roomTypes", "/room-types", {
    search,
    sort,
    page,
    limit,
  });
};

export const useGetRoomType = (id?: number | null) => {
  return useGet<GetRoomTypeResponse>("roomType", `/room-types/${id}`, {}, !!id);
};

export const useGetRoomTypesForSelect = () => {
  return useGet<GetRoomTypesForSelectResponse>("roomTypesForSelect", `/room-types/select`);
};

export const useAddRoomType = () => {
  return usePost<BaseApiResponse, NewRoomType>("/room-types", "roomTypes");
};

export const useUpdateRoomType = () => {
  return usePut<BaseApiResponse, NewRoomType>("/room-types", "roomTypes");
};

export const useDeleteRoomType = () => {
  return useDelete<BaseApiResponse>(`/room-types`, "roomTypes");
};
