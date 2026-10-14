import config from "@/config/config";
import TGenericResponse from "@/types/response";
import formatParams from "./formatParams";

// has been use same tag in the dashboard as well
export type TTags =
  | "products"
  | `product-${string}`
  | `relatedProducts-${string}`
  | `collectionProducts-${string}`
  | "bestSellingProducts"
  | "featuredProducts"
  | "priceRange"
  | "categories"
  | "blogPosts"
  | `blogPost-${string}`
  | "qna"
  | `qna-${string}`
  | "blogQaCategories"
  | "blogQaTags"
  | "blogQaTopics"
  | "brands"
  | "bookPreviews"
  | "collections"
  | "paymentMethod"
  | "shippingCharge"
  | "sliderBanner"
  | "homepageSections"
  | `homepageSections-${string}`
  | "homepageIndividualSection";

type TProps = {
  url: string;
  tags?: TTags[];
  revalidate?: number;
  params?: Record<string, unknown>;
  cache?: RequestCache;
};

const serverSideFetcher = async <T>({
  url,
  tags = [],
  params,
  cache,
  revalidate,
}: TProps): Promise<TGenericResponse<T>> => {
  const rawBaseUrl = (config.api_base_url || "").trim().replace(/\/+$/, "");
  const cleanBaseUrl = rawBaseUrl.replace(/\/server-api(\/v1)?$/i, "");
  let apiUrl = `${cleanBaseUrl}/server-api/v1${url}`;
  const defaultCache: RequestCache =
    config.env === "development" ? "no-store" : "force-cache";
  const reqConfig = {
    cache: cache || defaultCache,
    next: { tags, ...(revalidate ? { revalidate } : {}) },
  };

  if (Object.keys(params || {}).length) {
    const modifiedSearchParams = formatParams(params as Record<string, string>);
    apiUrl = apiUrl.concat("?", modifiedSearchParams);
  }

  try {
    const res = await fetch(apiUrl, reqConfig);

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const errorMessage =
        errorData?.message ||
        errorData?.error ||
        `Something went wrong or try again later`;

      return {
        success: false,
        message: errorMessage,
        data: [] as unknown as T,
      };
    }

    const data = await res.json();

    return {
      success: data?.success,
      message: data?.message,
      data: data?.data as T,
      meta: data?.meta,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to fetch",
      data: [] as unknown as T,
    };
  }
};

export default serverSideFetcher;
