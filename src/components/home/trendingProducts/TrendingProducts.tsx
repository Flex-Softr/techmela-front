import ProductCard from "@/components/productCards/ProductCard";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextPMiddle,
  CarouselPreviousPMiddle,
} from "@/components/ui/carousel";
import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";

const TrendingProducts = async () => {
  const { data: trendingProducts = [] } = await serverSideFetcher<TProduct[]>({
    url: "/products/featured",
    tags: ["products"],
  });

  return (
    <section className="pt-20">
      <ContainerMax>
        <SectionTitle title="বর্তমানে জনপ্রিয় পণ্য" href="/shop" />
        <div>
          <Carousel>
            <CarouselContent className="p-4">
              {trendingProducts?.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/5"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPreviousPMiddle />
            <CarouselNextPMiddle />
          </Carousel>
        </div>
      </ContainerMax>
    </section>
  );
};

export default TrendingProducts;
