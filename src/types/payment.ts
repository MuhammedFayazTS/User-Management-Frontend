import { SelectOption } from "@/components/core/DefaultSelect";
import { BaseApiResponse } from "./common";

export interface GetPaymentModesForSelectResponse extends BaseApiResponse {
  paymentModes: SelectOption[];
}
