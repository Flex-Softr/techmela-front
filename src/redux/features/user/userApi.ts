import baseApi from "@/redux/baseApi/baseApi";
import TGenericResponse from "@/types/response";
import { TOrderInfo } from "@/types/order/orderInfo";
import { TUserProfile } from "@/types/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation<
      TGenericResponse<{ accessToken: string }>,
      Record<string, unknown>
    >({
      query: (userInfo) => ({
        url: "/users/create-customer",
        method: "POST",
        body: userInfo,
      }),
    }),

    getUserData: builder.query<TGenericResponse<TUserProfile>, undefined>({
      query: () => "/users/profile",
      providesTags: ["UserProfile"],
    }),
    getOrderedProducts: builder.query<
      TGenericResponse<TOrderInfo[]>,
      undefined
    >({
      query: () => "/orders/customer",
    }),
    getGuestOrderHistory: builder.query<TGenericResponse<TOrderInfo[]>, string>(
      {
        query: (phoneNumber) => `/orders/guest-order-history/${phoneNumber}`,
      }
    ),
    getOrderProductById: builder.query<TGenericResponse<TOrderInfo>, string>({
      query: (_id) => `/orders/customer/${_id}`,
    }),
    updateUserData: builder.mutation<
      TGenericResponse<TUserProfile>,
      Partial<TUserProfile>
    >({
      query: (updatedData) => ({
        url: "/customers",
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetUserDataQuery,
  useGetOrderedProductsQuery,
  useGetGuestOrderHistoryQuery,
  useLazyGetGuestOrderHistoryQuery,
  useGetOrderProductByIdQuery,
  useUpdateUserDataMutation,
} = userApi;
