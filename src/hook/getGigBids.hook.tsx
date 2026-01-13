import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/utils/apiRequest";
import type { IBid } from "@/@types/bid.types";

type UseGigBidsState = {
  data: IBid[];
  loading: boolean;
  error: string | null;
};

const normalizeBids = (bids: IBid[]): IBid[] =>
  bids.map((bid) => ({
    ...bid,
    createdAt: bid.createdAt ? new Date(bid.createdAt) : bid.createdAt,
    updatedAt: bid.updatedAt ? new Date(bid.updatedAt) : bid.updatedAt,
  }));

export const useGigBids = (gigId: string) => {
  const [state, setState] = useState<UseGigBidsState>({
    data: [],
    loading: false,
    error: null,
  });

  const fetchBids = useCallback(async () => {
    if (!gigId) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await apiRequest<IBid[]>("GET", `/bids/${gigId}`);
      setState({
        data: normalizeBids(result),
        loading: false,
        error: null,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch bids";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: message,
      }));
    }
  }, [gigId]);

  const hireBid = useCallback(
    async (bidId: string) => {
      try {
        console.log("Hiring bid with ID:", bidId);
        await apiRequest("PATCH", `/bids/${bidId}/hire`);
        // Refresh bids after hiring
        await fetchBids();
        return { success: true };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to hire freelancer";
        return { success: false, error: message };
      }
    },
    [fetchBids]
  );

  useEffect(() => {
    if (gigId) {
      fetchBids();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gigId]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refetch: fetchBids,
    hireBid,
  };
};
