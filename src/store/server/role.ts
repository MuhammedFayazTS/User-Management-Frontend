import { BaseApiResponse, DefaultQueryParams } from "@/types/common";
import { GetRoleResponse, GetRolesForSelectResponse, GetRolesResponse, NewRole } from "@/types/role";
import { useDelete, useGet, usePost, usePut } from "@/utils/reactQuery";

export const useGetRoles = (filters?: DefaultQueryParams) => {
  const { search, sort, page = "1", limit = "10" } = filters || {};
  return useGet<GetRolesResponse>("roles", "/roles", {
    search,
    sort,
    page,
    limit,
  });
};

export const useGetRole = (id?: number | null) => {
  return useGet<GetRoleResponse>("role", `/roles/${id}`, {}, !!id);
};

export const useGetRolesForSelect = () => {
  return useGet<GetRolesForSelectResponse>("rolesForSelect", `/roles/select`);
};

export const useAddRole = () => {
  return usePost<BaseApiResponse, NewRole>("/roles", "roles");
};

export const useUpdateRole = () => {
  return usePut<BaseApiResponse, NewRole>("/roles", "roles");
};

export const useDeleteRole = () => {
  return useDelete<BaseApiResponse>(`/roles`, "roles");
};
