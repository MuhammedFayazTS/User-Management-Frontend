import { BaseApiResponse, DefaultQueryParams } from "@/types/common";
import { GetGroupResponse, GetGroupsForSelectResponse, GetGroupsResponse, NewGroup } from "@/types/group";
import { useDelete, useGet, usePost, usePut } from "@/utils/reactQuery";

export const useGetGroups = (filters?: DefaultQueryParams) => {
  const { search, sort, page = "1", limit = "10" } = filters || {};
  return useGet<GetGroupsResponse>("groups", "/groups", {
    search,
    sort,
    page,
    limit,
  });
};

export const useGetGroup = (id?: number | null) => {
  return useGet<GetGroupResponse>("group", `/groups/${id}`, {}, !!id);
};

export const useGetRolesForSelect = () => {
  return useGet<GetGroupsForSelectResponse>("groupsForSelect", `/groups/select`);
};

export const useAddGroup = () => {
  return usePost<BaseApiResponse, NewGroup>("/groups", "groups");
};

export const useUpdateGroup = () => {
  return usePut<BaseApiResponse, NewGroup>("/groups", "groups");
};

export const useDeleteGroup = () => {
  return useDelete<BaseApiResponse>(`/groups`, "groups");
};
