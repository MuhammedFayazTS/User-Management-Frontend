import { SelectOption } from "@/components/core/DefaultSelect";
import { BaseApiResponse, BaseGetAllApiResponse } from "./common";

export interface Branch {
  id: number;
  name: string;
  countryId: number;
  image?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface NewBranch {
  name: string;
  countryId: number;
  image?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
}

export interface GetBranch {
  getBranch: Branch;
}

export interface GetBranchesResponse extends BaseGetAllApiResponse {
  branches: {
    count: number;
    rows: Branch[] | [];
  };
}

export interface GetBranchResponse extends BaseApiResponse {
  branch: Branch;
}

export interface GetBranchesForSelectResponse extends BaseApiResponse {
  branches: SelectOption[];
}
