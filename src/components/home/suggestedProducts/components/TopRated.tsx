import ProductCard from "@/components/productCards/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import serverSideFetcher from "@/hooks/serverSideFetcher";
import { TProduct } from "@/types/products/product";

const TopRated = async () => {
  const [{ data: topRatedProducts }] =
    await serverSideFetcher<TProduct[]>("/products/featured"); // TODO:Change endpoints

  return (
    <>
      <Carousel>
        <CarouselContent className="p-3">
          {topRatedProducts?.map((product) => (
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

export default TopRated;
