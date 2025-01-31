import API from "@/api/axios-cient";
import { useErrorStore } from "@/store/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook to perform GET requests with query parameters.
 */
export const useGet = <T>(
  key: string,
  endpoint: string,
  params: Record<string, string | number | undefined> = {},
  enabled: boolean = true
) => {
  const setError = useErrorStore((state) => state.setError);
  const resetError = useErrorStore((state) => state.resetError);

  return useQuery<T>({
    queryKey: [key, params],
    queryFn: async () => {
      try {
        resetError();
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
        const response = await API.get(`${endpoint}?${queryParams.toString()}`);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error?.response?.data?.message || "An error occurred.");
        throw error;
      }
    },
    enabled: enabled && !!endpoint,
  });
};

/**
 * Custom hook to perform POST requests.
 */
export const usePost = <T, U>(endpoint: string, invalidateKey?: string) => {
  const queryClient = useQueryClient();
  const setError = useErrorStore((state) => state.setError);
  const resetError = useErrorStore((state) => state.resetError);

  return useMutation<T, Error, U>({
    mutationFn: async (data) => {
      try {
        resetError();
        const response = await API.post(endpoint, data, {
          headers: {
            ...(data instanceof FormData && { "Content-Type": "multipart/form-data" }),
          },
        });
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error?.response?.data?.message || "An error occurred.");
        throw error;
      }
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
    },
  });
};

/**
 * Custom hook to perform PUT requests.
 */
export const usePut = <T, U>(endpoint: string, invalidateKey?: string) => {
  const queryClient = useQueryClient();
  const setError = useErrorStore((state) => state.setError);
  const resetError = useErrorStore((state) => state.resetError);

  return useMutation<T, Error, { id: number; data: U }>({
    mutationFn: async ({ id, data }) => {
      try {
        resetError();
        const response = await API.put(`${endpoint}/${id}`, data, {
          headers: {
            ...(data instanceof FormData && { "Content-Type": "multipart/form-data" }),
          },
        });
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error?.response?.data?.message || "An error occurred.");
        throw error;
      }
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
    },
  });
};

/**
 * Custom hook to perform DELETE requests.
 */
export const useDelete = <T>(endpoint: string, invalidateKey?: string) => {
  const queryClient = useQueryClient();
  const setError = useErrorStore((state) => state.setError);
  const resetError = useErrorStore((state) => state.resetError);

  return useMutation<T, Error, number>({
    mutationFn: async (id) => {
      try {
        resetError();
        const response = await API.delete(`${endpoint}/${id}`);
        return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error?.response?.data?.message || "An error occurred.");
        throw error;
      }
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
    },
  });
};
