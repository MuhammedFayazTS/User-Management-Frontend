import { useDelete, useGet, usePost, usePut } from "@/utils/reactQuery";
import { BaseApiResponse, DefaultQueryParams } from "@/types/common";
import {
  AddOrUpdateUserResponse,
  GetUserResponse,
  GetUsersResponse,
  NewUserPayload,
} from "@/types/user";

interface UserQueryParams extends DefaultQueryParams {
  roleId?: string;
}

export const useAddUser = () => {
  return usePost<AddOrUpdateUserResponse, NewUserPayload | FormData>(
    "/users/create-with-temp-password",
    "users"
  );
};

export const useGetUsers = (filters?: UserQueryParams) => {
  const { search, sort, page = "1", limit = "10", roleId } = filters || {};
  return useGet<GetUsersResponse>("users", "/users", {
    search,
    sort,
    page,
    limit,
    roleId,
  });
};

export const useGetUser = (id?: number | null) => {
  return useGet<GetUserResponse>("user", `/users/${id}`, {}, !!id);
};

export const useUpdateUser = () => {
  return usePut<AddOrUpdateUserResponse, NewUserPayload | FormData>(
    "/users",
    "users"
  );
};

export const useDeleteUser = () => {
  return useDelete<BaseApiResponse>(`/users`, "users");
};
