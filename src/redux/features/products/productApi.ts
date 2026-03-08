import baseApi from "@/redux/baseApi/baseApi";
import { TProduct } from "@/types/products/product";

// Define the product query result type
type ProductQueryResult = {
  data: TProduct[];
  meta: { total: number; totalPage: number; page: number; limit: number };
};

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductQueryResult, Record<string, unknown>>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            // Handle arrays (e.g., categories, tags)
            if (Array.isArray(value)) {
              value.forEach((v) => queryParams.append(key, String(v)));
            } else {
              queryParams.append(key, String(value));
            }
          }
        });

        return {
          url: `/products?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
    getBestSellingProducts: builder.query<
      ProductQueryResult,
      Record<string, unknown>
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, String(value));
          }
        });
        return {
          url: `/products/best-selling?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["bestSellingProducts"],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetBestSellingProductsQuery } =
  productApi;
