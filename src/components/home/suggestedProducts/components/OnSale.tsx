import ProductCard from "@/components/productCards/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import serverSideFetcher from "@/hooks/serverSideFetcher";
import { TProduct } from "@/types/products/product";

const OnSale = async () => {
  const [{ data: onSaleProducts = [] }] =
    await serverSideFetcher<TProduct[]>("/products/featured"); // TODO: Change endpoint

  return (
    <>
      <Carousel>
        <CarouselContent className="p-3">
          {onSaleProducts?.map((product) => (
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

export default OnSale;
