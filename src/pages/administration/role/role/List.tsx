import React from "react";
import { DataTableToolbar } from "@/components/core/table/DataTableToolbar";
import { DefaultTable } from "@/components/core/table/DefaultTable";
import { DefaultTableSkeleton } from "@/components/core/table/DefaultTableSkelton";
import { DataTableColumnHeader } from "@/components/core/table/DataTableColumnHeader";
import { useDataTable } from "@/hooks/use-data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableFilterField } from "@/types/common";

// Sample data
const data = [
  { id: 1, name: "John Doe", age: 28 },
  { id: 2, name: "Jane Smith", age: 32 },
  // More data...
];

// Column definitions with DataTableColumnHeader
const columns: ColumnDef<typeof data[0]>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
  },
];

// Filter fields
const filterFields: DataTableFilterField<typeof data[0]>[] = [
  { value: "name", placeholder: "Search by name", label: "Name" },
  { value: "age", placeholder: "Search by age", label: "Age" },
];

const RoleList = () => {
  const isLoading = false;

  // Hook usage
  const { table } = useDataTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / 10),
    filterFields,
    enableAdvancedFilter: false,
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      columnPinning: { right: ["actions"] },
    },
  });

  return isLoading ? (
    <DefaultTableSkeleton columnCount={columns.length} />
  ) : (
    <div className="container mx-auto py-10">
      <DataTableToolbar table={table} filterFields={filterFields} />
      <DefaultTable
        table={table}
        totalRows={data.length}
        className="custom-table-class"
      />
    </div>
  );
};

export default RoleList;
