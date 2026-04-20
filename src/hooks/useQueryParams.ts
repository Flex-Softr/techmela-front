"use client";

import queryFormatter from "@/lib/queryFormatter";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type QueryKeys =
  | "category"
  | "brand"
  | "collection"
  | "stock"
  | "status"
  | "search"
  | "sort"
  | "sort_order"
  | "page"
  | "limit"
  | "minPrice"
  | "maxPrice"
  | "featured";

/**
 * Custom hook to manage query parameters in the URL.
 * Provides functions to set, get, remove, and reset query parameters.
 */
export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParams = useMemo(() => {
    const params: Record<string, string | string[]> = {
      sort: "-updatedAt", // Default sort
    };

    const allowedKeys: QueryKeys[] = [
      "category",
      "brand",
      "collection",
      "stock",
      "status",
      "search",
      "sort",
      "sort_order",
      "page",
      "limit",
      "minPrice",
      "maxPrice",
      "featured",
    ];

    // Map allowed search params to the query object
    allowedKeys.forEach((key) => {
      const values = searchParams.getAll(key);
      if (values.length > 0) {
        params[key] = values.length > 1 ? values : values[0];
      }
    });

    // Ensure page and limit have defaults if they aren't provided in URL
    if (!params.page) params.page = "1";
    if (!params.limit) params.limit = "12";

    return params;
  }, [searchParams]);

  const setParam = useCallback(
    (
      queryParams:
        | Record<QueryKeys, string>
        | Partial<Record<QueryKeys, string>>
    ) => {
      // Step 1: Get current query params as object
      const currentParams: Record<string, string | string[]> = {};
      searchParams.forEach((value, key) => {
        if (currentParams[key]) {
          const existing = currentParams[key];
          currentParams[key] = Array.isArray(existing)
            ? [...existing, value]
            : [existing, value];
        } else {
          currentParams[key] = value;
        }
      });

      // Step 2: Merge with new params
      const mergedParams = {
        ...currentParams,
        ...queryParams,
      };

      // Step 3: Format and push
      const newQuery = queryFormatter(mergedParams);
      const currentQuery = searchParams.toString();

      // Robust logical comparison using URLSearchParams
      // Sort both to ensure order doesn't trigger a navigation
      const newSPF = new URLSearchParams(newQuery);
      const currentSPF = new URLSearchParams(currentQuery);

      newSPF.sort();
      currentSPF.sort();

      if (newSPF.toString() !== currentSPF.toString()) {
        router.replace(`?${newSPF.toString()}`, { scroll: false });
      }
    },
    [router, searchParams]
  );

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const removeParam = useCallback(
    (key: QueryKeys | QueryKeys[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (Array.isArray(key)) {
        key.forEach((k) => params.delete(k));
      } else {
        params.delete(key);
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const resetParams = useCallback(() => {
    router.replace("?", { scroll: false });
  }, [router]);

  return useMemo(
    () => ({
      setParam,
      getParam,
      removeParam,
      resetParams,
      queryParams,
      currentPage: Number(queryParams.page) || 1,
      limit: Number(queryParams.limit) || 12,
    }),
    [setParam, getParam, removeParam, resetParams, queryParams]
  );
};
