import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
import JsonLd from "@/components/shared/JsonLd";
import Box from "@/components/ui/ec/Box";
import { TSingleProduct } from "@/types/products/singleProduct";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";
import {
  generateBreadcrumbSchema,
  generateProductSchema,
  generateProductMetadata,
} from "@/utilities/schema.util";
import ProductClientWrapper from "./components/ProductClientWrapper";
import ProductDescription from "./components/ProductDescription";
import ProductImageGallery from "./components/ProductImageGallery";
import RelatedProduct from "./components/RelatedProduct";

type TProps = {
  params: {
    slug: string;
    id: string;
  };
};

// export const revalidate = false; // On-demand revalidation only

export async function generateStaticParams() {
  try {
    const productsResponse = await serverSideFetcher<{ slug: string }[]>({
      url: "/products?limit=1000&fields=slug",
      tags: ["products"],
    });

    return (productsResponse?.data || []).map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error generating static params for products:", error);
    return [];
  }
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const product = await fetchProductData(params.slug);
  return generateProductMetadata(product, params.slug) as Metadata;
}

const fetchProductData = async (slug: string) => {
  const response = await serverSideFetcher<TSingleProduct>({
    url: `/products/${slug}`,
    tags: [`product-${decodeURIComponent(slug)}`],
  });
  return response?.data;
};

const ProductDetailsPage = async ({ params }: TProps) => {
  const product = await fetchProductData(params.slug);

  if (!product) {
    return (
      <ErrorMessage
        message="No product found"
        className="text-center text-2xl py-5"
      />
    );
  }

  const { gallery, price, variations = [] } = product;

  // Determine the default variation if available
  const defaultVariation = variations[0] || null;
  const initialVariationPrice = defaultVariation
    ? defaultVariation.price
    : price;

  const discount = price?.discountPercent || 0;

  const productJsonLd = generateProductSchema(product);
  const breadcrumbJsonLd = generateBreadcrumbSchema(product);

  return (
    <section>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ContainerMax>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
          <Box className="shadow-none ring-2 lg:mt-5">
            <ProductImageGallery gallery={gallery} discount={discount} />
          </Box>
          <Box className="p-4 space-y-4 shadow-none ring-0">
            <h1 className="font-semibold text-xl lg:text-2xl text-foreground">
              {product.title}
            </h1>
            {/* Use the client-side wrapper component */}
            <ProductClientWrapper
              product={product}
              initialVariationPrice={initialVariationPrice}
              defaultVariation={defaultVariation}
            />
          </Box>
          <div className="col-span-1 lg:col-span-2 px-3 mt-8">
            <ProductDescription product={product} />
          </div>
          {/* related product  */}
          <RelatedProduct slug={params.slug} />
        </div>
      </ContainerMax>
    </section>
  );
};

export default ProductDetailsPage;
