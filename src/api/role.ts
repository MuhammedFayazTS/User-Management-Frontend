import { NewRole } from "@/types/role";
import API from "./axios-cient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DefaultQueryParams } from "@/types/common";

export const roleMutationFn = async (data: NewRole) =>
  await API.post(`/roles`, data);

export const roleDeleteFn = async (roleId: number) =>
  await API.delete(`/roles/${roleId}`);

export const useGetRoles = (filters?: DefaultQueryParams) => {
  const { search, sort, page = "1", limit = "10" } = filters || {};
  return useQuery({
    queryKey: ["roles", search, sort, page, limit],
    queryFn: () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);

      return API.get(`/roles?${params.toString()}`).then(
        (response) => response.data
      );
    },
    enabled: !!filters,
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roleDeleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
