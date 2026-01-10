import baseApi from "@/redux/baseApi/baseApi";
import { TOrderInfo } from "@/types/order/orderInfo";
import TGenericResponse from "@/types/response";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createOrder: builder.mutation<TGenericResponse<TOrderInfo>, any>({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["carts"],
    }),
    singleOrder: builder.query({
      query: (data) => `/orders/customer/${data.id}`,
    }),
  }),
});

export const { useCreateOrderMutation, useSingleOrderQuery } = orderApi;
