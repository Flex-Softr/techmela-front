import ProductCard from "@/components/productCards/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";

const Featured = async () => {
  const { data: featuredProducts = [] } = await serverSideFetcher<TProduct[]>({
    url: "/products/featured",
    tags: ["products"],
  });
  return (
    <>
      <Carousel>
        <CarouselContent className="p-3">
          {featuredProducts?.map((product) => (
            <CarouselItem
              key={product._id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/5"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default Featured;
