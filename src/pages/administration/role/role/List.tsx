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

const actions = (id: number) => {
  console.log("id:", id)
  const actions: IAction[] = getListActions({
    onEdit: () => { },
    onDelete: () => { },
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

// Filter fields
const filterFields: DataTableFilterField<Role>[] = [
  { value: "name", placeholder: "Search by name", label: "Name" },
];

const RoleList = () => {
  const [searchParams] = useSearchParams();
  console.log('SearchParams:', searchParams.toString());
  const search = searchParams.get("name")
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const { data, isLoading } = useGetRoles({ search, sort, page, limit });

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
    </div>
  );
};

export default RoleList;
