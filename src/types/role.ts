import { SelectOption } from "@/components/core/DefaultSelect";
import { BaseApiResponse, BaseGetAllApiResponse } from "./common";
import { Permission } from "./permission";

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
}

export interface NewRole {
  name: string;
  permissions?: Permission[];
}

export interface RolePermission {
  rolePermission: Permission[];
}

export interface GetRole {
  getRole: Role;
}

export interface GetRolesResponse extends BaseGetAllApiResponse {
  roles: {
    count: number;
    rows: Role[] | [];
  };
}

export interface GetRoleResponse extends BaseApiResponse {
  role: Role;
}

export interface GetRolesForSelectResponse extends BaseApiResponse {
  roles: SelectOption[];
}
