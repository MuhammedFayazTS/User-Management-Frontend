import { PageType } from "@/layout/PageLayout";

export const isForm = (page: PageType) => {
  if (page !== "create" && page !== "edit") {
    return false;
  }
  return true;
};

export function assertDefined<T>(
  value: T | undefined | null,
  msg?: string
): asserts value is T {
  if (value === undefined) {
    throw new Error(msg ?? "value cant be undefined");
  }
  if (value === null) {
    throw new Error(msg ?? "value cant be null");
  }
}
