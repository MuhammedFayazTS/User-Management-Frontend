import { NewRole } from "@/types/role";
import API from "./axios-cient";
import { useQuery } from "@tanstack/react-query";

type QueryOptions = {
  sort?: string | null;
  search?: string | null;
  page?: string | null;
  limit?: string | null;
};

export const roleMutationFn = async (data: NewRole) =>
  await API.post(`/roles`, data);

export const useGetRoles = (filters?: QueryOptions) => {
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
