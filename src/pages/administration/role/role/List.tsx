import { DataTableToolbar } from "@/components/core/table/DataTableToolbar";
import { DefaultTable } from "@/components/core/table/DefaultTable";
import { DefaultTableSkeleton } from "@/components/core/table/DefaultTableSkelton";
import { DataTableColumnHeader } from "@/components/core/table/DataTableColumnHeader";
import { useDataTable } from "@/hooks/use-data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableFilterField } from "@/types/common";
import { Actions, IAction } from "@/components/core/table/Actions";
import { getListActions } from "@/utils/actions";
import { useGetRoles } from "@/api/role";
import { Role } from "@/types/role";
import { useSearchParams } from "react-router";
import PermissionBadge from "@/components/PermissionBadge";
import { useState } from "react";
import ConfirmDialog, { IConfirmDialog } from "@/components/dialog/ConfirmDialog";

// Filter fields
const filterFields: DataTableFilterField<Role>[] = [
  { value: "name", placeholder: "Search by name", label: "Name" },
];

const RoleList = () => {
  const [confirmDialog, setConfirmDialog] = useState<IConfirmDialog>()
  const [searchParams] = useSearchParams();
  const search = searchParams.get("name")
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const { data, isLoading } = useGetRoles({ search, sort, page, limit });

  const onClickDelete = (id:number) => {
    console.log("id:", id)
    // selectedId(id)
    setConfirmDialog({
      isOpen: true,
      title: "Delete Role",
      onConfirm: onConfirmDelete,
    });
  };
  
  const onConfirmDelete = () => {
    // console.log("id:", id)
    setConfirmDialog({...confirmDialog,isOpen:false} as unknown as IConfirmDialog);
  };

  const actions = (id: number) => {
    const actions: IAction[] = getListActions({
      onEdit: () => { },
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
      cell: ({ row }) => <Actions actions={actions(+row.id)} />,
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
