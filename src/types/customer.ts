import { SelectOption } from "@/components/core/DefaultSelect";
import { BaseApiResponse, BaseGetAllApiResponse } from "./common";

export interface Customer {
  id: number;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  countryId?: number;
}

export interface NewCustomer {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  countryId?: number;
}

export interface GetCustomer {
  getCustomer: Customer;
}

export interface GetCustomersResponse extends BaseGetAllApiResponse {
  customers: {
    count: number;
    rows: Customer[] | [];
  };
}

export interface GetCustomerResponse extends BaseApiResponse {
  customer: Customer;
}

export interface GetCustomersForSelectResponse extends BaseApiResponse {
  customers: SelectOption[];
}
