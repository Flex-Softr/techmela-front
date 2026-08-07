import ProductCard from "@/components/productCards/ProductCard";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/products/product";
import TGenericResponse from "@/types/response";
import Link from "next/link";

const FeaturedProducts = async ({
  promise,
}: {
  promise: Promise<TGenericResponse<TProduct[]>>;
}) => {
  const { data: featuredProducts = [] } = await promise;

  return (
    <>
      {featuredProducts.length > 0 && (
        <section className="pt-10 md:pt-12">
          <div className="mb-6 px-4 text-center md:mb-8">
            <SectionTitle title="Featured Products" className="text-primary" />
            <SectionSubtitle text="Browse our curated product collection" />
          </div>

          <ContainerMax>
            <div className="mt-5">
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 lg:gap-3">
                {featuredProducts?.slice(0, 5)?.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            </div>
            {featuredProducts.length > 5 && (
              <div className="flex justify-center mt-5">
                <Button asChild size={"sm"} className="px-6">
                  <Link href={"/shop?featured=true"}>View All</Link>
                </Button>
              </div>
            )}
          </ContainerMax>
        </section>
      )}
    </>
  );
};

export default FeaturedProducts;
