import { NewRole } from "@/types/role";
import API from "./axios-cient";

export const roleMutationFn = async (data: NewRole) =>
  await API.post(`/roles`, data);
