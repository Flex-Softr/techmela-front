// import baseApi from "@/redux/baseApi/baseApi";

// const couponCalculation = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getCouponCalculation: builder.query({
//       query: (data) => `/coupons/calculate-coupon-discount${data.coupon}`,
//     }),
//   }),
// });

// export const { useGetCouponCalculationQuery } = couponCalculation;
import baseApi from "@/redux/baseApi/baseApi";

export const couponCalculation = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCouponCalculation: builder.mutation({
      query: (requestBody) => ({
        url: "/coupons/calculate-coupon-discount",
        method: "POST",
        body: requestBody,
      }),
    }),
  }),
});

export const { useGetCouponCalculationMutation } = couponCalculation;
