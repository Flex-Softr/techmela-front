import ProductCard from "@/components/productCards/ProductCard";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/products/product";
import Link from "next/link";
import TGenericResponse from "@/types/response";

const BestSellingProducts = async ({
  promise,
}: {
  promise: Promise<TGenericResponse<TProduct[]>>;
}) => {
  const { data } = await promise;

  const bestSellingProducts = data || [];

  return (
    <>
      {bestSellingProducts.length > 0 && (
        <section className="pt-10 md:pt-12">
          <div className="mb-6 px-4 text-center md:mb-8">
            <SectionTitle
              title="Best Selling Products"
              className="text-primary"
            />
            <SectionSubtitle text="Discover our most popular products" />
          </div>

          <ContainerMax>
            <div className="mt-5">
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 lg:gap-3">
                {bestSellingProducts?.slice(0, 5)?.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            </div>
            {bestSellingProducts.length > 5 && (
              <div className="flex justify-center mt-5">
                <Button asChild size={"sm"} className="px-6">
                  <Link href={"/best-selling-products"}>View All</Link>
                </Button>
              </div>
            )}
          </ContainerMax>
        </section>
      )}
    </>
  );
};

export default BestSellingProducts;
