export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

export interface DefaultQueryParams {
  sort?: string;
  search?: string;
  page?: string;
  limit?: string;
}

export interface BaseApiResponse {
  message: string;
}

export interface BaseGetAllApiResponse extends BaseApiResponse {
  message: string;
  pageCount: number;
  itemCount: number;
}