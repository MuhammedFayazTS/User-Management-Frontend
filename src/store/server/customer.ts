import { BaseApiResponse, DefaultQueryParams } from "@/types/common";
import { GetCustomerResponse, GetCustomersForSelectResponse, GetCustomersResponse, NewCustomer } from "@/types/customer";
import { useDelete, useGet, usePost, usePut } from "@/utils/reactQuery";

export const useGetCustomers = (filters?: DefaultQueryParams) => {
  const { search, sort, page = "1", limit = "10" } = filters || {};
  return useGet<GetCustomersResponse>("customers", "/customers", {
    search,
    sort,
    page,
    limit,
  });
};

export const useGetCustomer = (id?: number | null) => {
  return useGet<GetCustomerResponse>("room", `/customers/${id}`, {}, !!id);
};

export const useGetCustomersForSelect = () => {
  return useGet<GetCustomersForSelectResponse>("customersForSelect", `/customers/select`);
};

export const useAddCustomer = () => {
  return usePost<BaseApiResponse, NewCustomer>("/customers", "customers");
};

export const useUpdateCustomer = () => {
  return usePut<BaseApiResponse, NewCustomer>("/customers", "customers");
};

export const useDeleteCustomer = () => {
  return useDelete<BaseApiResponse>(`/customers`, "customers");
};
