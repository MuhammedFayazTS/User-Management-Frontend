import { useGet } from "@/utils/reactQuery";
import { GetPaymentModesForSelectResponse } from "@/types/payment";

export const useGetPaymentModesForSelect = () => {
  return useGet<GetPaymentModesForSelectResponse>(
    "paymentModes",
    `/payments/modes/select`
  );
};
