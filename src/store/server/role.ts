import { DefaultQueryParams } from "@/types/common";
import { Permission } from "@/types/permission";
import { Role } from "@/types/role";
import { useDelete, useGet, usePost, usePut } from "@/utils/reactQuery";

// response types
interface GetRolesResponse {
  message: string;
  roles: {
    count: number;
    rows: Role[] | [];
  };
  pageCount: number;
  itemCount: number;
}

interface GetRoleResponse {
  role: Role;
}

interface DeleteRoleResponse {
  data: { message: string };
}

export interface AddOrUpdateRoleResponse {
  data: {
    message: string;
  };
}

// payload types
interface AddOrUpdateRolePayload {
  name: string;
  permissions?: Permission[];
}

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

export const useAddRole = () => {
  return usePost<AddOrUpdateRoleResponse, AddOrUpdateRolePayload>("/roles", "roles");
};

export const useUpdateRole = () => {
  return usePut<AddOrUpdateRoleResponse, AddOrUpdateRolePayload>("/roles", "roles");
};

export const useDeleteRole = () => {
  return useDelete<DeleteRoleResponse>("/roles", "roles");
};
