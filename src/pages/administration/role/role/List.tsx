import { DataTableToolbar } from "@/components/core/table/DataTableToolbar";
import { DefaultTable } from "@/components/core/table/DefaultTable";
import { DefaultTableSkeleton } from "@/components/core/table/DefaultTableSkelton";
import { DataTableColumnHeader } from "@/components/core/table/DataTableColumnHeader";
import { useDataTable } from "@/hooks/use-data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableFilterField } from "@/types/common";
import { Actions, IAction } from "@/components/core/table/Actions";
import { getListActions } from "@/utils/actions";
import { useDeleteRole, useGetRoles } from "@/store/server/role";
import { Role } from "@/types/role";
import { useSearchParams } from "react-router";
import PermissionBadge from "@/components/PermissionBadge";
import { FC, useState } from "react";
import ConfirmDialog, { IConfirmDialog } from "@/components/dialog/ConfirmDialog";
import { useRoleStore } from "@/store/client";
import { assertDefined } from "@/utils/common-helper";
import { toast } from "@/hooks/use-toast";
import { handleAxiosError } from "@/api/api-error";
import { MessageCircleWarningIcon } from "lucide-react";

interface IListProps {
  togglePage: (view: 'edit') => void;
}

// Filter fields
const filterFields: DataTableFilterField<Role>[] = [
  { value: "name", placeholder: "Search by name", label: "Name" },
];

const RoleList: FC<IListProps> = ({ togglePage }) => {
  const [confirmDialog, setConfirmDialog] = useState<IConfirmDialog>()
  const [searchParams] = useSearchParams();
  const resetDatabaseId = useRoleStore((state) => state.reset);
  const setDatabaseId = useRoleStore((state) => state.setDatabaseId);
  const databaseId = useRoleStore((state) => state.databaseId);

  const search = searchParams.get("name") || undefined
  const sort = searchParams.get("sort") || undefined;
  const page = searchParams.get("page") || '1';
  const limit = searchParams.get("limit") || '10';

  const { data, isLoading } = useGetRoles({ search, sort, page, limit });
  const { mutate } = useDeleteRole();

  const onClickEdit = async (id: number) => {
    await setDatabaseId(id);
    togglePage('edit')
  }

  const onClickDelete = async (id: number) => {
    await setDatabaseId(id);
    setConfirmDialog({
      isOpen: true,
      title: "Delete Role",
      TitleIcon: MessageCircleWarningIcon,
      onConfirm: onConfirmDelete,
    });
  };

  const onConfirmDelete = async () => {
    assertDefined(databaseId, "Role id is not defined")
    mutate(databaseId, {
      onSuccess: (response) => {
        toast({
          title: response?.data?.message,
          variant: "default",
        });
      },
      onError: (error) => {
        const { statusCode, message } = handleAxiosError(error);
        console.log({ statusCode, error });
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      },
    });
    await resetDatabaseId()
    setConfirmDialog({ ...confirmDialog, isOpen: false } as unknown as IConfirmDialog);
  };

  const actions = (id: number) => {
    const actions: IAction[] = getListActions({
      onEdit: () => onClickEdit(id),
      onDelete: () => onClickDelete(id),
    })
    return actions
  }

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "Sl No",
      cell: ({ row }) => {
        const rowIndex = row.index + 1;
        return <div>{rowIndex}</div>;
      },
      enableSorting: false
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    },
    {
      accessorKey: "Permissions",
      cell: ({ row }) => <PermissionBadge maxWidth={300} permissions={row.original.permissions} />
    },
    {
      accessorKey: "actions",
      cell: ({ row }) => <Actions actions={actions(+row.original.id)} />,
      size: 5
    },
  ];

  const { table } = useDataTable({
    data: data?.roles?.rows ?? [],
    columns,
    pageCount: data?.pageCount ?? 1,
    filterFields,
    enableAdvancedFilter: false,
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  return isLoading ? (
    <DefaultTableSkeleton columnCount={columns.length} />
  ) : (
    <div className="container mx-auto py-10">
      <DataTableToolbar table={table} filterFields={filterFields} />
      <DefaultTable
        table={table}
        totalRows={data?.itemCount ?? 0}
        className="custom-table-class"
      />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
};

export default RoleList;
