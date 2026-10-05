import type { ComputedRef, MaybeRefOrGetter, Ref } from 'vue';
import type { QueryKey, UseInfiniteQueryReturnType, UseQueryReturnType } from '@tanstack/vue-query';

// ── Table State Types ─────────────────────────────────────────────────────────

export interface TableParams {
  page?: number;
  cursor?: string;
  limit: number;
  search?: string;
  filters?: object;
  sortKey?: string;
  order?: 'ASC' | 'DESC';
  [key: string]: unknown;
}

export interface TableSort {
  sortKey?: string;
  order?: 'ASC' | 'DESC';
}

export interface TableStateOptions<TFilters extends object = object> {
  query?: MaybeRefOrGetter<TFilters>;
  limit?: number;
  searchDebounce?: number;
  initialSearch?: string;
  initialFilters?: object;
  flatFilters?: boolean;
  initialSort?: TableSort;
  paginationType?: 'offset' | 'cursor' | 'none';
}

export interface TableStateReturn<TFilters extends object = object> {
  search: Ref<string>;
  debouncedSearch: Ref<string>;
  isDebouncing: ComputedRef<boolean>;
  filters: Ref<TFilters>;
  setFilters: (newFilters: Partial<TFilters>) => void;
  clearFilters: () => void;
  hasSearch: ComputedRef<boolean>;
  hasFilters: ComputedRef<boolean>;
  hasActiveFilters: ComputedRef<boolean>;
  itemsPerPage: Ref<number>;
  baseParams: ComputedRef<TableParams>;
  page: Ref<number>;
  cursor: Ref<string | null>;
  sortKey: Ref<string | undefined>;
  order: Ref<'ASC' | 'DESC' | undefined>;
  sort: (sorting: TableSort) => void;
}

// ── Data & Fetch Common Types ────────────────────────────────────────────────

export type DataTableState =
  | 'loading'
  | 'empty'
  | 'search-empty'
  | 'filtered-empty'
  | 'success'
  | 'error';

export type InfiniteScrollDataState = DataTableState;

export interface BaseDataFetchOptions<
  TFilters extends object = object,
  TEndpoint = string,
  TQueryKey = QueryKey,
> extends TableStateOptions<TFilters> {
  queryKey: TQueryKey;
  endpoint: TEndpoint;
  queryOptions?: object;
  extractData?: (data: unknown) => unknown[];
}

export interface BaseDataQueryReturn<TData> {
  data: ComputedRef<TData[]>;
  meta: ComputedRef<Meta | CursorMeta | null | undefined>;
  isEmpty: ComputedRef<boolean>;
  isSearchEmpty: ComputedRef<boolean>;
  isFilteredEmpty: ComputedRef<boolean>;
  tableState: ComputedRef<DataTableState>;
  dynamicQueryKey: ComputedRef<QueryKey>;
  changeLimit: (limit: number) => void;
  extraData: ComputedRef<unknown>;
}

// ── useDataTable Types ───────────────────────────────────────────────────────

export type UseTableOptions<TFilters extends object = object> = BaseDataFetchOptions<
  TFilters,
  string,
  QueryKey
>;

export type UseDataTableReturn<
  TData,
  TFilters extends object = object,
  TError = Error,
> = TableStateReturn<TFilters> &
  BaseDataQueryReturn<TData> &
  Omit<UseQueryReturnType<unknown, TError>, 'data' | 'meta'> & {
    meta: ComputedRef<Meta | CursorMeta | null>;
    tableState: ComputedRef<DataTableState>;
    goToNext: () => void;
    goToPrev: () => void;
    goToPage: (page: number) => void;
  };

// ── useDataInfiniteScroll Types ──────────────────────────────────────────────

export type UseDataInfiniteScrollOptions<TFilters extends object = object> = BaseDataFetchOptions<
  TFilters,
  MaybeRefOrGetter<string>,
  MaybeRefOrGetter<QueryKey>
>;

export type UseDataInfiniteScrollReturn<
  TData,
  TFilters extends object = object,
  TError = Error,
> = TableStateReturn<TFilters> &
  BaseDataQueryReturn<TData> &
  Omit<UseInfiniteQueryReturnType<unknown, TError>, 'data' | 'meta' | 'hasNextPage'> & {
    meta: ComputedRef<Meta | CursorMeta | null | undefined>;
    tableState: ComputedRef<InfiniteScrollDataState>;
    hasMore: Ref<boolean>;
  };
