import { BaseApiResponse, BaseGetAllApiResponse } from "./common";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  image?: string | File;
  origin?: "simple" | "google";
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
