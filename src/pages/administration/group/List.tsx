import { DataTableToolbar } from "@/components/core/table/DataTableToolbar";
import { DefaultTable } from "@/components/core/table/DefaultTable";
import { DefaultTableSkeleton } from "@/components/core/table/DefaultTableSkelton";
import { DataTableColumnHeader } from "@/components/core/table/DataTableColumnHeader";
import { useDataTable } from "@/hooks/use-data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { BaseApiResponse, DataTableFilterField } from "@/types/common";
import { Actions, IAction } from "@/components/core/table/Actions";
import { getListActions } from "@/utils/actions";
import { useSearchParams } from "react-router";
import { FC, useEffect, useState } from "react";
import ConfirmDialog, { IConfirmDialog } from "@/components/dialog/ConfirmDialog";
import { assertDefined } from "@/utils/common-helper";
import { MessageCircleWarningIcon } from "lucide-react";
import { handleMutationError, handleSuccessResponse } from "@/utils/handleMutationResponse";
import { PageType } from "@/layout/PageLayout";
import { Group } from "@/types/group";
import { useGroupStore } from "@/store/client";
import { useDeleteGroup, useGetGroups } from "@/store/server/group";

interface IListProps {
  togglePage: (view: PageType) => void;
}

// Filter fields
const filterFields: DataTableFilterField<Group>[] = [
  { value: "name", placeholder: "Search by name", label: "Name" },
];

const GroupList: FC<IListProps> = ({ togglePage }) => {
  const [confirmDialog, setConfirmDialog] = useState<IConfirmDialog>()
  const [searchParams] = useSearchParams();
  const { reset: resetDatabaseId, setDatabaseId, databaseId, toggleViewPage } = useGroupStore((state) => state);

  const search = searchParams.get("name") || undefined
  const sort = searchParams.get("sort") || undefined;
  const page = searchParams.get("page") || '1';
  const limit = searchParams.get("limit") || '10';

  const { data, isLoading } = useGetGroups({ search, sort, page, limit });
  const { mutate } = useDeleteGroup();

  const onClickView = async (id: number) => {
    await setDatabaseId(id);
    togglePage('edit')
    toggleViewPage(true)
  }

  const onClickEdit = async (id: number) => {
    await setDatabaseId(id);
    togglePage('edit')
  }

  const onClickDelete = async (id: number) => {
    await setDatabaseId(id);
  };

  const mutationConfig = {
    onSuccess: (response: BaseApiResponse) => handleSuccessResponse(true, response?.message),
    onError: (error: unknown) => handleMutationError(error),
  };

  useEffect(() => {
    if (databaseId) {
      setConfirmDialog({
        isOpen: true,
        title: "Delete Group",
        TitleIcon: MessageCircleWarningIcon,
        onConfirm: onConfirmDelete,
      });
    }
  }, [databaseId]);

  const onConfirmDelete = async () => {
    assertDefined(databaseId, "Group id is not defined", true)
    mutate(databaseId, mutationConfig);
    await resetDatabaseId()
    setConfirmDialog({ ...confirmDialog, isOpen: false } as unknown as IConfirmDialog);
  };

  const actions = (id: number) => {
    const actions: IAction[] = getListActions({
      onView: () => onClickView(id),
      onEdit: () => onClickEdit(id),
      onDelete: () => onClickDelete(id),
    })
    return actions
  }

  const columns: ColumnDef<Group>[] = [
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
      accessorKey: "actions",
      cell: ({ row }) => <Actions actions={actions(+row.original.id)} />,
      size: 5
    },
  ];

  const { table } = useDataTable({
    data: data?.groups?.rows ?? [],
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

export default GroupList;
