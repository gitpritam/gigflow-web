import { useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/utils/apiRequest";
import { GigStatus, type IGig } from "@/@types/gig.types";

type SortOrder = "asc" | "desc";

type SortBy = "createdAt" | "budget" | "deadline" | "updatedAt";

export type GigsQuery = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  status?: GigStatus;
  ownership?: "true" | "false"; // true => only current user gigs
  minBudget?: number;
  maxBudget?: number;
};

type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type GigsApiResult = {
  gigs: IGig[];
  pagination: PaginationMeta;
};

type UseGigsState = {
  data: IGig[];
  pagination: PaginationMeta | null;
  loading: boolean;
  error: string | null;
};

const DEFAULT_QUERY: Required<
  Pick<GigsQuery, "page" | "limit" | "sortBy" | "sortOrder">
> = {
  page: 1,
  limit: 9,
  sortBy: "createdAt",
  sortOrder: "desc",
};

const normalizeGigs = (gigs: IGig[]): IGig[] =>
  gigs.map((gig) => ({
    ...gig,
    deadline: gig.deadline ? new Date(gig.deadline) : gig.deadline,
    createdAt: gig.createdAt ? new Date(gig.createdAt) : gig.createdAt,
    updatedAt: gig.updatedAt ? new Date(gig.updatedAt) : gig.updatedAt,
  }));

export const useGigs = (initialQuery?: GigsQuery) => {
  const [query, setQuery] = useState<GigsQuery>({
    ...DEFAULT_QUERY,
    ...initialQuery,
  });
  const [state, setState] = useState<UseGigsState>({
    data: [],
    pagination: null,
    loading: false,
    error: null,
  });

  const fetchGigs = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const params: Record<string, string | number | undefined> = {
        page: query.page,
        limit: query.limit,
        search: query.search?.trim() || undefined,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
        status: query.status,
        ownership: query.ownership,
        minBudget: query.minBudget,
        maxBudget: query.maxBudget,
      };

      const result = await apiRequest<GigsApiResult>(
        "GET",
        "/gigs",
        undefined,
        params
      );
      setState({
        data: normalizeGigs(result.gigs),
        pagination: result.pagination,
        loading: false,
        error: null,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch gigs";
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }, [query]);

  useEffect(() => {
    async function loadGigs() {
      await fetchGigs();
    }
    loadGigs();
  }, [fetchGigs]);

  const setPage = (page: number) => setQuery((prev) => ({ ...prev, page }));
  const setLimit = (limit: number) =>
    setQuery((prev) => ({ ...prev, limit, page: 1 }));
  const setSearch = (search: string) =>
    setQuery((prev) => ({ ...prev, search, page: 1 }));
  const setSort = (sortBy: SortBy, sortOrder: SortOrder = "desc") =>
    setQuery((prev) => ({ ...prev, sortBy, sortOrder, page: 1 }));
  const setStatus = (status?: GigStatus) =>
    setQuery((prev) => ({ ...prev, status, page: 1 }));
  const setOwnership = (ownership?: "true" | "false") =>
    setQuery((prev) => ({ ...prev, ownership, page: 1 }));
  const setBudgetRange = (minBudget?: number, maxBudget?: number) =>
    setQuery((prev) => ({ ...prev, minBudget, maxBudget, page: 1 }));

  const helpers = useMemo(
    () => ({
      setPage,
      setLimit,
      setSearch,
      setSort,
      setStatus,
      setOwnership,
      setBudgetRange,
      setQuery,
      refetch: fetchGigs,
    }),
    [fetchGigs]
  );

  return {
    data: state.data,
    pagination: state.pagination,
    loading: state.loading,
    error: state.error,
    query,
    ...helpers,
  };
};

export default useGigs;
