"use client";

import { useEffect } from "react";
import PriceRangeSlider from "./PriceRange";
import { useShopFilters } from "../ShopFiltersContext";

const PriceRangeSliderWrapper = ({ min, max }: { min: number; max: number }) => {
  const { priceFilterState, setPriceFilterState, setAbsPriceRange } = useShopFilters();

  useEffect(() => {
    setAbsPriceRange(min, max);
  }, [min, max, setAbsPriceRange]);

  return (
    <PriceRangeSlider
      initialState={priceFilterState}
      setInitialState={setPriceFilterState}
      min={min}
      max={max}
    />
  );
};

export default PriceRangeSliderWrapper;
