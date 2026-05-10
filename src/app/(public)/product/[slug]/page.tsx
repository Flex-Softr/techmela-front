import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
import JsonLd from "@/components/shared/JsonLd";
import Box from "@/components/ui/ec/Box";
import { STOCK_STATUS } from "@/const/product.const";
import { TSingleProduct } from "@/types/products/singleProduct";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { getImageSrc } from "@/lib/utils";
import { Metadata } from "next";
import ProductClientWrapper from "./components/ProductClientWrapper";
import ProductDescription from "./components/ProductDescription";
import RelatedProduct from "./components/RelatedProduct";
import ProductImageGallery from "./components/ProductImageGallery";

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
      url: "/products?limit=30&fields=slug",
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
  const imageUrl = getImageSrc(
    product?.thumbnail?.src || product?.gallery?.[0]?.src
  );

  const title = product?.seoData?.metaTitle || product?.title;
  const rawDescription =
    product?.seoData?.metaDescription ||
    product?.shortDescription ||
    "সিদ্দীকিয়া প্রকাশনী থেকে সেরা ইসলামিক বই কিনুন।";
  const description = rawDescription.replace(/<[^>]+>/g, "").trim();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
        {
          url: "https://siddikiaprokashoni.com/logo/logo.png",
          alt: "সিদ্দীকিয়া প্রকাশনী",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://siddikiaprokashoni.com/product/${params.slug}`,
    },
  };
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

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Product", "Book"],
    name: product.title,
    description: product.seoData?.metaDescription || product.shortDescription,
    image: getImageSrc(product.thumbnail?.src || product.gallery?.[0]?.src),
    sku: product.inventory?.sku,
    isbn: product.attribute?.find((attr) => attr.name.toLowerCase() === "isbn")
      ?.values[0],
    inLanguage: "bn",
    offers: {
      "@type": "Offer",
      url: `https://siddikiaprokashoni.com/product/${product.slug}`,
      priceCurrency: "BDT",
      price: product.price?.salePrice || product.price?.regularPrice,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.inventory?.stockStatus === STOCK_STATUS.IN_STOCK
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "সিদ্দীকিয়া প্রকাশনী",
      },
    },
    author: product.author
      ? { "@type": "Person", name: product.author }
      : product.brand?.name
        ? { "@type": "Person", name: product.brand.name }
        : undefined,
    publisher: {
      "@type": "Organization",
      name: "সিদ্দীকিয়া প্রকাশনী",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "হোম",
        item: "https://siddikiaprokashoni.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "শপ",
        item: "https://siddikiaprokashoni.com/shop",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `https://siddikiaprokashoni.com/product/${product.slug}`,
      },
    ],
  };

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
