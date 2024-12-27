import { ModulePermission } from "./permission";

export interface Module {
  id: string;
  name: string;
  type: string;
  slug: string;
  permissions: ModulePermission[];
}

export enum Modules {
  USERS = "Users",
  ROLES = "Roles",
  GROUPS = "Groups",
  PERMISSIONS = "Permissions",
  SETTINGS = "Settings",
}
