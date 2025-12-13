import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the coupon
type TCouponState = {
  couponDiscount: number | null;
  shippingChange: number | null;
  coupon: string | null;
  cost: number | null;
  error: string | null;
};

const initialState: TCouponState = {
  couponDiscount: null,
  coupon: null,
  shippingChange: null,
  cost: null,
  error: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupon: (
      state,
      action: PayloadAction<{
        couponDiscount: number;
        coupon: string;
        shippingChange: number;
        cost: number;
      }>
    ) => {
      state.couponDiscount = action.payload.couponDiscount;
      state.coupon = action.payload.coupon;
      state.shippingChange = action.payload.shippingChange;
      state.cost = action.payload.cost;
      state.error = null;
    },
    setCouponError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetCoupon: (state) => {
      state.couponDiscount = null;
      state.shippingChange = null;
      state.coupon = null;
      state.cost = null;
      state.error = null;
    },
  },
});

export const { setCoupon, setCouponError, resetCoupon } = couponSlice.actions;

export default couponSlice.reducer;
