"use client";

import { useQueryParams, type QueryKeys } from "./useQueryParams";
import { useCallback, useMemo } from "react";

export const useShopFilterQuery = () => {
  const queryParamsHook = useQueryParams();
  const { queryParams, setParam } = queryParamsHook;

  const getArrayParam = useCallback(
    (key: QueryKeys): string[] => {
      const value = queryParams[key];
      if (!value) return [];
      return Array.isArray(value) ? value : value.split(",").filter(Boolean);
    },
    [queryParams]
  );

  const toggleArrayParam = useCallback(
    (key: QueryKeys, value: string) => {
      const current = getArrayParam(key);
      const exists = current.includes(value);
      let updated: string[];

      if (exists) {
        updated = current.filter((v) => v !== value);
      } else {
        updated = [...current, value];
      }

      setParam({ [key]: updated.join(",") });
    },
    [getArrayParam, setParam]
  );

  const setArrayParam = useCallback(
    (key: QueryKeys, values: string[]) => {
      setParam({ [key]: values.join(",") });
    },
    [setParam]
  );

  return useMemo(
    () => ({
      ...queryParamsHook,
      getArrayParam,
      toggleArrayParam,
      setArrayParam,
    }),
    [queryParamsHook, getArrayParam, toggleArrayParam, setArrayParam]
  );
};
