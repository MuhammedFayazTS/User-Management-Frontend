"use client";

import * as React from "react";
import type { DataTableFilterField } from "@/types/common";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type TableState,
  type VisibilityState,
} from "@tanstack/react-table";
import { z } from "zod";

import { useDebounce } from "@/hooks/use-debounce";

interface UseDataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  pageCount: number;
  filterFields?: DataTableFilterField<TData>[];
  enableAdvancedFilter?: boolean;
  state?: Omit<Partial<TableState>, "sorting"> & {
    sorting?: {
      id: Extract<keyof TData, string>;
      desc: boolean;
    }[];
  };
}

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().optional(),
  sort: z.string().optional(),
});

export function useDataTable<TData, TValue>({
  data,
  columns,
  pageCount,
  filterFields = [],
  enableAdvancedFilter = false,
  state,
}: UseDataTableProps<TData, TValue>) {
  // React states to manage query parameters
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = React.useState(() => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params);
  });
  const pathname = window.location.pathname;

  const { page, per_page, sort } = searchParamsSchema.parse(searchParams);
  const [column, order] = sort?.split(".") ?? [];

  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    };
  }, [filterFields]);

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Object.entries(searchParams).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        const filterableColumn = filterableColumns.find(
          (column) => column.value === key
        );
        const searchableColumn = searchableColumns.find(
          (column) => column.value === key
        );

        if (filterableColumn) {
          filters.push({
            id: key,
            value: value.split("."),
          });
        } else if (searchableColumn) {
          filters.push({
            id: key,
            value: [value],
          });
        }

        return filters;
      },
      []
    );
  }, [filterableColumns, searchableColumns, searchParams]);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>(
      state?.pagination ?? {
        pageIndex: page - 1,
        pageSize: per_page ?? 10,
      }
    );

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const [sorting, setSorting] = React.useState<SortingState>(
    state?.sorting ?? [
      {
        id: column ?? "",
        desc: order === "desc",
      },
    ]
  );

  React.useEffect(() => {
    const queryString = createQueryString({
      page: pageIndex + 1,
      per_page: pageSize,
      sort: sorting[0]?.id
        ? `${sorting[0]?.id}.${sorting[0]?.desc ? "desc" : "asc"}`
        : null,
    });

    window.history.pushState(null, "", `${pathname}?${queryString}`);
  }, [pageIndex, pageSize, sorting, createQueryString, pathname]);

  const debouncedSearchableColumnFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter((filter) => {
          return searchableColumns.find((column) => column.value === filter.id);
        })
      ),
      500
    )
  ) as ColumnFiltersState;

  const filterableColumnFilters = columnFilters.filter((filter) => {
    return filterableColumns.find((column) => column.value === filter.id);
  });

  React.useEffect(() => {
    if (enableAdvancedFilter) return;

    const newParamsObject: Record<string, string | number | null> = { page: 1 };

    for (const column of debouncedSearchableColumnFilters) {
      if (typeof column.value === "string") {
        newParamsObject[column.id] = column.value;
      }
    }

    for (const column of filterableColumnFilters) {
      if (Array.isArray(column.value)) {
        newParamsObject[column.id] = column.value.join(".");
      }
    }

    for (const key of Object.keys(searchParams)) {
      if (
        !debouncedSearchableColumnFilters.find((col) => col.id === key) &&
        !filterableColumnFilters.find((col) => col.id === key)
      ) {
        newParamsObject[key] = null;
      }
    }

    const queryString = createQueryString(newParamsObject);
    window.history.replaceState(null, "", `${pathname}?${queryString}`);
  }, [
    JSON.stringify(debouncedSearchableColumnFilters),
    JSON.stringify(filterableColumnFilters),
    createQueryString,
    pathname,
    searchParams,
    enableAdvancedFilter,
  ]);

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      ...state,
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return { table };
}
