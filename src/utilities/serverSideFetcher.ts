"use server";
import config from "@/config/config";
import { revalidateTag } from "next/cache";
// import { cookies } from "next/headers";
import TGenericResponse from "@/types/response";
import formatParams from "./formatParams";

// has been use same tag in the dashboard as well
type TTags =
  | "products"
  | `product-${string}`
  | `relatedProducts-${string}`
  | `collectionProducts-${string}`
  | "bestSellingProducts"
  | "featuredProducts"
  | "allCategories"
  | "parentCategory"
  | "paymentMethod"
  | "shippingCharge"
  | "sliderBanner"
  | "homepageSections"
  | `homepageSections-${string}`;

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
  let apiUrl = `${config.api_base_url}/api/v1${url}`;
  // const accessToken = cookies().get("__app.ec.at")?.value;
  const reqConfig = {
    // headers: { authorization: `Bearer ${accessToken}` },
    cache: cache || "force-cache", // ✅ "force-cache" caches forever
    next: { tags, revalidate },
  };

  if (Object.keys(params || {}).length) {
    const modifiedSearchParams = formatParams(params as Record<string, string>);
    apiUrl = apiUrl.concat("?", modifiedSearchParams);
  }

  const res = await fetch(apiUrl, reqConfig);

  if (!res.ok) {
    // Attempt to extract error message from the response body
    const errorData = await res.json().catch(() => null); // Prevent JSON parse errors
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

export async function refetchData(tag: TTags) {
  revalidateTag(tag);
}
