import { useGet, usePost } from "@/utils/reactQuery";
import { DefaultQueryParams } from "@/types/common";
import { AddOrUpdateUserResponse, GetUsersResponse, NewUserPayload } from "@/types/user";

export const useAddUser = () => {
  return usePost<AddOrUpdateUserResponse, NewUserPayload | FormData>(
    "/users/create-with-temp-password",
    "users"
  );
};

export const useGetUsers = (filters?: DefaultQueryParams) => {
  const { search, sort, page = "1", limit = "10" } = filters || {};
  return useGet<GetUsersResponse>("users", "/users", {
    search,
    sort,
    page,
    limit,
  });
};
