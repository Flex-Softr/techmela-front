import ContainerMax from "@/components/containerMax/ContainerMax";
// import ProductCardPrimary from "@/components/productCards/ProductCardPrimary";
import ProductCardSecondary from "@/components/productCards/ProductCardSecondary";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";

const ProductsGallery = async () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { data } = await serverSideFetcher<any>({
    url: "/products",
    tags: ["products"],
  });
  const products = data as TProduct[];
  return (
    <section className="pt-8">
      <ContainerMax>
        <SectionTitle title="Great Deal" href="/shop" />
        <div className="flex gap-3 flex-wrap justify-center mt-5">
          {products?.slice(0, 6)?.map((product) => (
            <ProductCardSecondary key={product._id} product={product} />
            // <ProductCardPrimary product={product} key={product._id}/>
          ))}
        </div>
      </ContainerMax>
    </section>
  );
};

export default ProductsGallery;
