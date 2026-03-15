import baseApi from "@/redux/baseApi/baseApi";
import { ApiResponse } from "./interface";

export const searchProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    findSearchProduct: builder.query<ApiResponse, string>({
      query: (searchValue) => `/products?search=${searchValue}`,
    }),
  }),
});

export const { useFindSearchProductQuery } = searchProductApi;
