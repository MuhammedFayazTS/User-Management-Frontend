import { usePost } from "@/utils/reactQuery";
import { AddOrUpdateRoleResponse } from "./role";

interface AddOrUpdateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export const useAddUser = () => {
  return usePost<AddOrUpdateRoleResponse, AddOrUpdateUserPayload>(
    "/users",
    "users"
  );
};
