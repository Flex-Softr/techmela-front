import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
import Box from "@/components/ui/ec/Box";
import { TSingleProduct } from "@/types/products/singleProduct";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Phone } from "lucide-react";
import { Metadata } from "next";
import ProductClientWrapper from "./components/ProductClientWrapper";
import ProductDescription from "./components/ProductDescription";
import RelatedProduct from "./components/RelatedProduct";
import SingleProductPageImageGallery from "./components/SingleProductPageImageGallery";
import ProductSharing from "./components/ProductSharing";

type TProps = {
  params: {
    slug: string;
    id: string;
  };
};

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const product = await fetchProductData(params.slug);

  return {
    title: product?.seoData?.metaTitle || product?.title,
    description: product?.seoData?.metaDescription,
    openGraph: {
      title: product?.seoData?.metaTitle || product?.title,
      description: product?.seoData?.metaDescription,
    },
  };
}

const fetchProductData = async (slug: string) => {
  const response = await serverSideFetcher<TSingleProduct>({
    url: `/products/${slug}`,
    tags: [`product-${slug}`],
  });
  return response?.data;
};

const SingleProductPage = async ({ params }: TProps) => {
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

  return (
    <section>
      <ContainerMax>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
          <Box className="shadow-none ring-2 lg:mt-5">
            <SingleProductPageImageGallery gallery={gallery} />
          </Box>
          <Box className="space-y-4 shadow-none ring-0">
            {/* Use the client-side wrapper component */}
            <ProductClientWrapper
              product={product}
              initialVariationPrice={initialVariationPrice}
              defaultVariation={defaultVariation}
            />

            <ProductSharing />

            {!product?.shortDescription && (
              <div className="border-2 p-4 rounded-md flex items-center gap-5">
                <div>
                  <a href="tel:+8801602431167">
                    <Phone className="text-primary size-10" />
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-xl">
                    <a href="tel:+8801602431167">01602431167</a>
                  </p>
                  <p className="text-xs font-semibold">Call for support</p>
                </div>
              </div>
            )}
          </Box>
          <div className="col-span-1 lg:col-span-2 px-3">
            <ProductDescription product={product} />
          </div>
          {/* related product  */}
          <RelatedProduct slug={params.slug} />
        </div>
      </ContainerMax>
    </section>
  );
};

export default SingleProductPage;
