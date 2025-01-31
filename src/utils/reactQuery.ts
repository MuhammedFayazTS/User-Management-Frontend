import API from "@/api/axios-cient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook to perform GET requests with query parameters.
 * @param key - The query key to uniquely identify the request.
 * @param endpoint - The API endpoint to fetch data from.
 * @param params - Optional query parameters for the GET request.
 * @returns A React Query useQuery hook for the GET request.
 */
export const useGet = <T>(
  key: string,
  endpoint: string,
  params: Record<string, string | number | undefined> = {},
  enabled: boolean = true
) => {
  return useQuery<T>({
    queryKey: [key, params],
    queryFn: () => {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      return API.get(`${endpoint}?${queryParams.toString()}`).then(
        (response) => response.data
      );
    },
    enabled: enabled && !!endpoint,
  });
};

/**
 * Custom hook to perform POST requests.
 * @param endpoint - The API endpoint to send data to.
 * @param invalidateKey - Optional query key to invalidate after mutation success.
 * @returns A React Query useMutation hook for the POST request.
 */
export const usePost = <T, U>(endpoint: string, invalidateKey?: string) => {
  const queryClient = useQueryClient();
  return useMutation<T, Error, U>({
    mutationFn: (data) =>
      API.post(endpoint, data, {
        headers: {
          ...(data instanceof FormData && {
            "Content-Type": "multipart/form-data",
          }),
        },
      }).then((response) => response.data),
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
    },
  });
};

/**
 * Custom hook to perform PUT requests.
 * @param endpoint - The API endpoint to update data.
 * @param invalidateKey - Optional query key to invalidate after mutation success.
 * @returns A React Query useMutation hook for the PUT request.
 */
export const usePut = <T, U>(endpoint: string, invalidateKey?: string) => {
  const queryClient = useQueryClient();
  return useMutation<T, Error, { id: number; data: U }>({
    mutationFn: ({ id, data }) =>
      API.put(`${endpoint}/${id}`, data, {
        headers: {
          ...(data instanceof FormData && {
            "Content-Type": "multipart/form-data",
          }),
        },
      }).then((response) => response.data),
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
    },
  });
};

/**
 * Custom hook to perform DELETE requests.
 * @param endpoint - The API endpoint to delete data from.
 * @param invalidateKey - Optional query key to invalidate after mutation success.
 * @returns A React Query useMutation hook for the DELETE request.
 */
export const useDelete = <T>(endpoint: string, invalidateKey?: string) => {
  const queryClient = useQueryClient();
  return useMutation<T, Error, number>({
    mutationFn: (id) =>
      API.delete(`${endpoint}/${id}`).then((response) => response.data),
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
    },
  });
};
