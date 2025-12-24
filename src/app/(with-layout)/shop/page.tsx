import ContainerMax from "@/components/containerMax/ContainerMax";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import ProductCardPrimary from "@/components/productCards/ProductCardPrimary";
import CustomPagination from "@/components/ui/shared/customPagination/CustomPagination";
import serverSideFetcher from "@/hooks/serverSideFetcher";
import TCategory from "@/types/categories/categories";
import { TProduct } from "@/types/products/product";
import { TTag } from "@/types/tags/tag";
import { Metadata } from "next";
import CategorySection from "./components/CategorySection";
import ProductFilterContent from "./components/ProductFilterContent";
// import CustomBreadcrumb from "./components/customBreadcrumb/CustomBreadcrumb";

export const metadata: Metadata = {
  title: "Shop",
  description: "Buy now",
};

type ShopPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

// Define the product query result type
type ProductQueryResult = {
  products: TProduct[];
  meta: { total: number; totalPage: number; page: number; limit: number }; // Include 'page' and 'limit'
};

const ShopPage = async ({ searchParams }: ShopPageProps) => {
  const flashSaleParam = searchParams.flashSale === "true"; // Check if flash sale is requested
  const currentPage = searchParams.page
    ? parseInt(searchParams.page as string)
    : 1;
  const limit = 12;
  const offset = (currentPage - 1) * limit;

  // Fetch flash sale products if the flash sale param is set
  const [{ data: flashSaleProducts = [], meta: flashSaleMeta }] =
    await serverSideFetcher<ProductQueryResult>(
      `/products/featured?page=${currentPage}&limit=${limit}&offset=${offset}`
    );

  // Fetch categories as usual
  const [{ data: categories = [] }] =
    await serverSideFetcher<TCategory[]>("/categories");

  // Fetch products based on current page, limit, and offset
  // Construct the base URL for the product query
  let productQueryUrl = `/products?page=${currentPage}&limit=${limit}&offset=${offset}`;

  // If the flashSaleParam is false, we append the query parameters like minPrice, maxPrice, category, etc.
  if (!flashSaleParam) {
    const queryParams = new URLSearchParams(
      searchParams as Record<string, string>
    );

    // Remove unnecessary page and offset parameters before appending
    queryParams.delete("page");
    queryParams.delete("offset");

    // Append the other parameters
    if (queryParams.toString()) {
      productQueryUrl += `&${queryParams.toString()}`;
    }
  }

  // Fetch products for regular products or flash sale products
  const [{ data, meta: productMeta }] =
    await serverSideFetcher<ProductQueryResult>(productQueryUrl);

  // Use flash sale products if flashSaleParam is true, otherwise use regular products
  const products = flashSaleParam ? flashSaleProducts : (data ?? []);

  // Fetch tags as usual
  const [{ data: tags = [] }] = await serverSideFetcher<TTag[]>(`/tags`);

  const hasCategoryParam = !!searchParams.category;

  const breadcrumbPaths = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ];

  if (flashSaleParam) {
    breadcrumbPaths.push({ name: "Flash Sale", url: "/shop?flashSale=true" });
  }

  if (hasCategoryParam) {
    const selectedCategories =
      typeof searchParams.category === "string"
        ? [searchParams.category] // Convert single string to array
        : (searchParams.category as string[]); // Treat as array

    selectedCategories.forEach((categorySlug) => {
      const category = categories.find((cat) => cat.slug === categorySlug);
      if (category) {
        breadcrumbPaths.push({
          name: category.name,
          url: `/shop?category=${category.slug}`,
        });
      }
    });
  }

  // Ensure productMeta and flashSaleMeta are defined before accessing their properties
  const totalProducts = flashSaleParam
    ? (flashSaleMeta?.total ?? 0)
    : (productMeta?.total ?? 0);

  const totalPages = Math.ceil(totalProducts / limit);

  // Always show pagination, even if there are fewer products on the current page
  const shouldShowPagination = totalPages > 1;

  return (
    <section className="relative pt-2 mt-16 md:mt-0 px-2">
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div> */}
      <ContainerMax>
        {/* <CustomBreadcrumb paths={breadcrumbPaths} /> */}
        {!hasCategoryParam && !flashSaleParam && (
          <CategorySection categories={categories} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-4 md:my-16">
          <div className="">
            <ProductFilterContent
              searchParams={searchParams}
              tags={tags}
              categories={categories}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5 justify-between">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product: TProduct) => (
                  <ProductCardPrimary key={product._id} product={product} />
                ))
              ) : (
                <ErrorMessage message="No products found" />
              )}
            </div>
            {/* Always show pagination */}
            {shouldShowPagination && (
              <CustomPagination
                meta={{
                  total: totalProducts, // Total products
                  totalPage: totalPages, // Total pages
                  page: currentPage, // Current page
                  limit, // Products per page
                }}
                currentPage={currentPage}
                searchParams={searchParams}
              />
            )}
          </div>
        </div>
      </ContainerMax>
    </section>
  );
};

export default ShopPage;
