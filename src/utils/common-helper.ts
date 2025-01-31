import { toast } from "@/hooks/use-toast";
import { PageType } from "@/layout/PageLayout";

export const server_url = import.meta.env.VITE_SERVER_URL

export const isForm = (page: PageType) => {
  if (page !== "create" && page !== "edit") {
    return false;
  }
  return true;
};

export function assertDefined<T>(
  value: T | undefined | null,
  msg?: string,
  showToast?:boolean
): asserts value is T {
  if (value === undefined) {
    if(showToast) toast({
      title:msg ?? "value cant be undefined",
      variant: "destructive",
    })
    throw new Error(msg ?? "value cant be undefined");
  }
  if (value === null) {
    if(showToast) toast({
      title:msg ?? "value cant be null",
      variant: "destructive",
    })
    throw new Error(msg ?? "value cant be null");
  }
}
