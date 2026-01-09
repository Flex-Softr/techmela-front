import ContainerMax from "@/components/containerMax/ContainerMax";
import ProductCard from "@/components/productCards/ProductCard";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import Link from "next/link";

const BestSellingProducts = async () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { data } = await serverSideFetcher<any>({
    url: "/products/best-selling",
    tags: ["products"],
  });
  const bestSellingProducts = data as TProduct[];

  return (
    <section className="pt-10 md:pt-12">
      <ContainerMax>
        <div className="mt-5">
          <SectionTitle title="Best selling items" />
          <SectionSubtitle text="Discover our most popular products" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 justify-between mt-5">
            {bestSellingProducts?.slice(0, 4)?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <Button asChild size={"sm"} className="w-[150px]">
            <Link href={"/shop"}>See more</Link>
          </Button>
        </div>
      </ContainerMax>
    </section>
  );
};

export default BestSellingProducts;
