import ContainerMax from "@/components/containerMax/ContainerMax";
import ProductCardPrimary from "@/components/productCards/ProductCardPrimary";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import serverSideFetcher from "@/hooks/serverSideFetcher";
import { TProduct } from "@/types/products/product";
import Link from "next/link";

const BestSellingProducts = async () => {
  const [{ data }] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await serverSideFetcher<any>("/products/best-selling"); // TODO: Change endpoint
  const bestSellingProducts = data as TProduct[];

  return (
    <section className="pt-10 md:pt-12">
      <ContainerMax>
        <div className="mt-5">
          <SectionTitle title="Best selling items" />
          <SectionSubtitle text="Discover our most popular products" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 justify-between mt-5">
            {bestSellingProducts?.slice(0, 4)?.map((product) => (
              <ProductCardPrimary product={product} key={product._id} />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <Button asChild size={"sm"} className="rounded-full w-[150px]">
            <Link href={"/shop"}>See more</Link>
          </Button>
        </div>
      </ContainerMax>
    </section>
  );
};

export default BestSellingProducts;
