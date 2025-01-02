export interface Permission {
  id: number;
  name: string;
  description?: string;
}

export interface GetUserPermissions {
  getUserPermissions: Permission[];
}
