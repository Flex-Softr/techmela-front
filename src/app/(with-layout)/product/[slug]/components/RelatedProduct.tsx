import ProductCard from "@/components/productCards/ProductCard";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";

type TRelatedProductProps = {
  slug: string;
};

const RelatedProduct = async ({ slug }: TRelatedProductProps) => {
  const response = await serverSideFetcher<TProduct[]>({
    url: `/products/related-products/${slug}`,
    tags: [`relatedProducts-${slug}`],
  });

  const products = response?.data;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="col-span-1 md:col-span-2 mt-10">
      <SectionTitle title="You may also like" href="/shop" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 justify-between mt-5">
        {products?.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
