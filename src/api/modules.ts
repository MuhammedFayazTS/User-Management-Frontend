import { DefaultQueryParams } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import API from "./axios-cient";

export const useGetModules = (filters?: DefaultQueryParams) => {
    const { search } = filters || {};
    return useQuery({
      queryKey: ["modules", search],
      queryFn: () => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
  
        return API.get(`/modules?${params.toString()}`).then(
          (response) => response.data
        );
      },
      enabled: !!filters,
    });
  };