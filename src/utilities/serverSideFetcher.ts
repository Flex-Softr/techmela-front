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
  let apiUrl = `${config.api_base_url}/server-api/v1${url}`;
  const reqConfig = {
    cache: cache || "force-cache",
    next: { tags, revalidate },
  };

  if (Object.keys(params || {}).length) {
    const modifiedSearchParams = formatParams(params as Record<string, string>);
    apiUrl = apiUrl.concat("?", modifiedSearchParams);
  }

  const res = await fetch(apiUrl, reqConfig);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const errorMessage =
      errorData?.message ||
      errorData?.error ||
      `Something went wrong or try again later`;

    throw new Error(errorMessage);
  }

  const data = await res.json();

  return {
    success: data?.success,
    message: data?.message,
    data: data?.data as T,
    meta: data?.meta,
  };
};

export default serverSideFetcher;
