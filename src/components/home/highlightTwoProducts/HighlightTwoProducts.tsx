import ContainerMax from "@/components/containerMax/ContainerMax";
import HorizontalProductCard from "@/components/productCards/HorizontalProductCard";
import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";

const HighlightTwoProducts = async () => {
  const { data: highlightedTwoProducts = [] } = await serverSideFetcher<
    TProduct[]
  >({
    url: "/products",
    tags: ["products"],
  });

  return (
    <section className="pt-20">
      <ContainerMax>
        <div className="flex gap-5 w-full flex-wrap">
          {highlightedTwoProducts?.slice(0, 2)?.map((product) => (
            <div key={product._id} className="flex-grow">
              <HorizontalProductCard product={product} />
            </div>
          ))}
        </div>
      </ContainerMax>
    </section>
  );
};

export default HighlightTwoProducts;
