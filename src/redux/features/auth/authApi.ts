import baseApi from "@/redux/baseApi/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["carts"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["carts"],
    }),
    changePassword: builder.mutation({
      query: (PasswordInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        body: PasswordInfo,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: userInfo,
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetInfo) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
