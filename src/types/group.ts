import { SelectOption } from "@/components/core/DefaultSelect";
import { BaseApiResponse, BaseGetAllApiResponse } from "./common";
// import { User } from "./user";
// import { Role } from "./role";

export interface Group {
  id: string;
  name: string;
  description?: string;
//   users: User[];
//   roles: Role[];
}

export interface NewGroup {
  name: string;
  description?: string;
//   users?: User[];
//   roles?: Role[];
}

export interface GetGroup {
  getGroup: Group;
}

export interface GetGroupsResponse extends BaseGetAllApiResponse {
  groups: {
    count: number;
    rows: Group[] | [];
  };
}

export interface GetGroupResponse extends BaseApiResponse {
  group: Group;
}

export interface GetGroupsForSelectResponse extends BaseApiResponse {
  groups: SelectOption[];
}
