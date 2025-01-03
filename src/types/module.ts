import { Permission } from "./permission";

export interface Module {
  id: string;
  name: string;
  type: string;
  slug: string;
  permissions?: Permission[];
}

export enum Modules {
  USERS = "Users",
  ROLES = "Roles",
  GROUPS = "Groups",
  PERMISSIONS = "Permissions",
  SETTINGS = "Settings",
}
