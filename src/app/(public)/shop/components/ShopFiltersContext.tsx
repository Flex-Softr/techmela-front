"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useShopFilterQuery } from "@/hooks/useShopFilterQuery";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

type ShopFiltersContextType = {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  selectedBrands: string[];
  setSelectedBrands: Dispatch<SetStateAction<string[]>>;
  selectedCollections: string[];
  setSelectedCollections: Dispatch<SetStateAction<string[]>>;
  stockStatus: string;
  setStockStatus: Dispatch<SetStateAction<string>>;
  priceFilterState: number[];
  setPriceFilterState: Dispatch<SetStateAction<number[]>>;
  absMinPrice: number;
  absMaxPrice: number;
  setAbsPriceRange: (_min: number, _max: number) => void;
  clearAllFilters: () => void;
  activeFilterCount: number;
  queryParams: Record<string, string | string[]>;
  currentPage: number;
  limit: number;
};

const ShopFiltersContext = createContext<ShopFiltersContextType | undefined>(
  undefined
);

export const useShopFilters = () => {
  const context = useContext(ShopFiltersContext);
  if (!context) {
    throw new Error("useShopFilters must be used within a ShopFiltersProvider");
  }
  return context;
};

export const ShopFiltersProvider = ({
  children,
  minPrice = 0,
  maxPrice = 10000,
}: {
  children: ReactNode;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const {
    queryParams,
    setParam,
    resetParams,
    getArrayParam,
    setArrayParam,
    currentPage,
    limit,
  } = useShopFilterQuery();

  // Dynamic absolute price range (passed from parent)
  const [absMinPrice, setAbsMinPrice] = useState<number>(minPrice);
  const [absMaxPrice, setAbsMaxPrice] = useState<number>(maxPrice);

  const isClearing = useRef(false);

  const [priceFilterState, setPriceFilterState] = useState<number[]>(() => [
    Number(queryParams.minPrice) || minPrice,
    Number(queryParams.maxPrice) || maxPrice,
  ]);

  // Sync with props if they change
  useEffect(() => {
    setAbsMinPrice(minPrice);
    setAbsMaxPrice(maxPrice);
    setPriceFilterState([
      Number(queryParams.minPrice) || minPrice,
      Number(queryParams.maxPrice) || maxPrice,
    ]);
  }, [minPrice, maxPrice, queryParams.minPrice, queryParams.maxPrice]);

  const setAbsPriceRange = (min: number, max: number) => {
    setAbsMinPrice(min);
    setAbsMaxPrice(max);
  };

  const debouncedPrice = useDebounce(priceFilterState, 500);

  // Sync price filter to URL when debounced value changes
  useEffect(() => {
    if (isClearing.current) return;
    
    // Only sync if the defaults are actually loaded (not 0/10000 if that's initial)
    const isPriceDefault =
      debouncedPrice[0] === absMinPrice &&
      debouncedPrice[1] === absMaxPrice;

    // IMPORTANT: Also check immediate state to prevent race conditions during clearing
    const isImmediatePriceDefault =
      priceFilterState[0] === absMinPrice &&
      priceFilterState[1] === absMaxPrice;

    if (isPriceDefault || isImmediatePriceDefault) {
      if (queryParams.minPrice || queryParams.maxPrice) {
        setParam({ minPrice: "", maxPrice: "" });
      }
    } else {
      if (
        queryParams.minPrice !== debouncedPrice[0].toString() ||
        queryParams.maxPrice !== debouncedPrice[1].toString()
      ) {
        setParam({
          minPrice: debouncedPrice[0].toString(),
          maxPrice: debouncedPrice[1].toString(),
        });
      }
    }
  }, [
    debouncedPrice,
    priceFilterState,
    absMinPrice,
    absMaxPrice,
    setParam,
    queryParams.minPrice,
    queryParams.maxPrice,
  ]);

  // Sync local price state if URL changes externally (e.g. back button)
  useEffect(() => {
    const minParam = Number(queryParams.minPrice) || absMinPrice;
    const maxParam = Number(queryParams.maxPrice) || absMaxPrice;
    setPriceFilterState((prev) =>
      prev[0] === minParam && prev[1] === maxParam
        ? prev
        : [minParam, maxParam]
    );
  }, [
    queryParams.minPrice,
    queryParams.maxPrice,
    absMinPrice,
    absMaxPrice,
  ]);

  const selectedCategories = useMemo(() => getArrayParam("category"), [
    getArrayParam,
  ]);
  const selectedBrands = useMemo(() => getArrayParam("brand"), [getArrayParam]);
  const selectedCollections = useMemo(() => getArrayParam("collection"), [
    getArrayParam,
  ]);
  const stockStatus = (queryParams["stock"] as string) || "";

  const clearAllFilters = () => {
    isClearing.current = true;
    setPriceFilterState([absMinPrice, absMaxPrice]);
    resetParams();
    // Reset the ref after a delay to allow navigation to finish
    setTimeout(() => {
      isClearing.current = false;
    }, 500);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (queryParams.category) count += 1;
    if (queryParams.brand) count += 1;
    if (queryParams.collection) count += 1;
    if (queryParams.stock) count += 1;
    if (queryParams.minPrice || queryParams.maxPrice) count += 1;
    return count;
  }, [queryParams]);

  return (
    <ShopFiltersContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories: (val) => {
          const next =
            typeof val === "function" ? val(selectedCategories) : val;
          setArrayParam("category", next);
        },
        selectedBrands,
        setSelectedBrands: (val) => {
          const next = typeof val === "function" ? val(selectedBrands) : val;
          setArrayParam("brand", next);
        },
        selectedCollections,
        setSelectedCollections: (val) => {
          const next =
            typeof val === "function" ? val(selectedCollections) : val;
          setArrayParam("collection", next);
        },
        stockStatus,
        setStockStatus: (val) => {
          const next = typeof val === "function" ? val(stockStatus) : val;
          setParam({ stock: next });
        },
        priceFilterState,
        setPriceFilterState,
        absMinPrice,
        absMaxPrice,
        setAbsPriceRange,
        clearAllFilters,
        activeFilterCount,
        queryParams,
        currentPage,
        limit,
      }}
    >
      {children}
    </ShopFiltersContext.Provider>
  );
};
