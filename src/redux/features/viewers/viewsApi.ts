import baseApi from "@/redux/baseApi/baseApi";

/** The full backend envelope from successResponse() */
type TViewsEnvelope = {
  success: boolean;
  message: string;
  /** The updated document — only `views` is needed here */
  data: {
    _id: string;
    views: number;
    [key: string]: unknown;
  };
};

export const viewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    incrementViews: build.mutation<
      TViewsEnvelope,
      { resource: "blog-posts" | "qna"; id: string }
    >({
      query: ({ resource, id }) => ({
        url: `/${resource}/${id}/views`,
        method: "PATCH",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useIncrementViewsMutation } = viewsApi;
