"use client";

import queryFormatter from "@/lib/queryFormatter";
import { useRouter, useSearchParams } from "next/navigation";
/**
 * Custom hook to manage query parameters in the URL.
 * Provides functions to set, get, remove, and reset query parameters.
 */
export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  type QueryKeys =
    | "category"
    | "status"
    | "search"
    | "sort"
    | "sort_order"
    | "page"
    | "limit";

  const setParam = (
    queryParams: Record<QueryKeys, string> | Partial<Record<QueryKeys, string>>
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
    // const query = queryFormatter(mergedParams);
    // if (!query || query === "page=1") return;
    // router.push(`?${query}`);
    const query = queryFormatter(mergedParams);
    if (query !== searchParams.toString()) {
      router.push(`?${query}`);
    }
  };

  const getParam = (key: string) => {
    return searchParams.get(key);
  };

  const removeParam = (key: QueryKeys | QueryKeys[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(key)) {
      key.forEach((k) => params.delete(k));
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const resetParams = () => {
    router.push("?");
  };

  return { setParam, getParam, removeParam, resetParams };
};
