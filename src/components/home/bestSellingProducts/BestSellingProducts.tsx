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
              title="সর্বাধিক বিক্রিত পণ্য"
              className="text-primary"
            />
            <SectionSubtitle text="গ্রাহকদের সবচেয়ে পছন্দের ও জনপ্রিয় গ্যাজেটসমূহ" />
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
              <div className="flex justify-center mt-6">
                <Button asChild size="sm" className="rounded-full px-7 bg-primary hover:bg-secondary text-primary-foreground shadow-sm">
                  <Link href={"/best-selling-products"}>সব সেরা পণ্য দেখুন</Link>
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
