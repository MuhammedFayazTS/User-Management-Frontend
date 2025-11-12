import { GetCountriesForSelectResponse } from "@/types/country";
import { useGet } from "@/utils/reactQuery";

export const useGetCountriesForSelect = () => {
  return useGet<GetCountriesForSelectResponse>(
    "countriesForSelect",
    `/countries/select`
  );
};
