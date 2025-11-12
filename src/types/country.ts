import { SelectOption } from "@/components/core/DefaultSelect";
import { BaseApiResponse } from "./common";

export interface GetCountriesForSelectResponse extends BaseApiResponse {
  countries: SelectOption[];
}