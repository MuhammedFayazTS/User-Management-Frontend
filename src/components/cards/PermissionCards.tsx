import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "../ui/checkbox";
import { FC } from "react";
import { Permission } from "@/types/permission";
import { Module } from "@/types/module";
import { Role } from "@/types/role";

export interface PermissionCardProps {
  module: Module;
  roles?: Role[];
  userSelectedPermissions?: Permission[];
  setUserSelectedPermissions?: React.Dispatch<React.SetStateAction<Permission[]>>;
  userPermissions?: Permission[];
  isViewPage?: boolean;
}

const PermissionCards: FC<PermissionCardProps> = ({
  module,
  // roles = [],
  userSelectedPermissions = [],
  setUserSelectedPermissions,
  // userPermissions = [],
  isViewPage = false,
}) => {
  // Helper function to determine if a permission is selected by the user
  const isPermissionSelected = (permissionId: number) => {
    return userSelectedPermissions.some(
      (permission) => permission.id === permissionId
    );
  };

  // Handle change of checkbox
  const handlePermissionChange = (permission: Permission) => {
    if (!setUserSelectedPermissions) return;

    const updatedPermissions = isPermissionSelected(permission.id)
      ? userSelectedPermissions.filter(
        (perm) => perm.id !== permission.id
      )
      : [...userSelectedPermissions, permission];

    setUserSelectedPermissions(updatedPermissions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{module.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {module.permissions?.map((permission) => (
          <div key={permission.id} className="flex items-center space-x-2">
            <Checkbox
              id={`${permission.id}`}
              checked={isPermissionSelected(permission.id)}
              onClick={() => handlePermissionChange(permission)}
              disabled={isViewPage}
            />
            <label
              htmlFor={`${permission.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {permission.name}
            </label>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        {isViewPage ? (
          <p className="text-sm text-gray-500">Viewing permissions (no changes allowed)</p>
        ) : (
          <p className="text-sm text-gray-500">Modify permissions for the selected module</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default PermissionCards;
