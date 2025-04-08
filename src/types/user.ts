import { BaseApiResponse, BaseGetAllApiResponse } from "./common";
import { Role } from "./role";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  image?: string | File;
  origin?: "simple" | "google";
  role?:Role
  roleName?:Role
}

export interface NewUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
}

export interface AddOrUpdateUserResponse extends BaseApiResponse {
  user: User;
}

export interface GetUsersResponse extends BaseGetAllApiResponse {
  users: {
    count: number;
    rows: User[] | [];
  };
}

export interface GetUserResponse extends BaseApiResponse {
  user: User;
}
