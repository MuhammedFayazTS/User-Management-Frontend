import { DefaultQueryParams } from "@/types/common";
import { Module } from "@/types/module";
import { useGet } from "@/utils/reactQuery";

interface GetModulesResponse {
  message: string;
  modules: {
    count: number;
    rows: Module[] | [];
  };
  pageCount: number;
  itemCount: number;
}

export const useGetModules = (filters?: DefaultQueryParams) => {
  const { search } = filters || {};
  return useGet<GetModulesResponse>("modules", "/modules", {
    search,
  });
};
