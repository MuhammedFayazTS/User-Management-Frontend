import { BaseApiResponse, DefaultQueryParams } from "@/types/common";
import { GetBranchResponse, GetBranchesForSelectResponse, GetBranchesResponse, NewBranch } from "@/types/branch";
import { useDelete, useGet, usePost, usePut } from "@/utils/reactQuery";

export const useGetBranches = (filters?: DefaultQueryParams) => {
  const { search, sort, page = "1", limit = "10" } = filters || {};
  return useGet<GetBranchesResponse>("branches", "/branches", {
    search,
    sort,
    page,
    limit,
  });
};

export const useGetBranch = (id?: number | null) => {
  return useGet<GetBranchResponse>("branch", `/branches/${id}`, {}, !!id);
};

export const useGetBranchesForSelect = () => {
  return useGet<GetBranchesForSelectResponse>("branchesForSelect", `/branches/select`);
};

export const useAddBranch = () => {
  return usePost<BaseApiResponse, NewBranch>("/branches", "branches");
};

export const useUpdateBranch = () => {
  return usePut<BaseApiResponse, NewBranch>("/branches", "branches");
};

export const useDeleteBranch = () => {
  return useDelete<BaseApiResponse>(`/branches`, "branches");
};
