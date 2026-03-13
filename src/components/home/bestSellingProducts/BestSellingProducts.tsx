import ContainerMax from "@/components/containerMax/ContainerMax";
import ProductCard from "@/components/productCards/ProductCard";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import Link from "next/link";

const BestSellingProducts = async () => {
  const { data } = await serverSideFetcher<TProduct[]>({
    url: "/products/best-selling",
    tags: ["bestSellingProducts"],
  });

  const bestSellingProducts = data || [];

  return (
    <>
      {bestSellingProducts.length > 0 && (
        <section className="pt-10 md:pt-12">
          <div className="bg-primary/5 py-2 md:py-3 px-4 mb-4 text-center border border-primary/10 shadow-sm">
            <SectionTitle
              title="বেস্ট সেলিং বইসমূহ"
              className="text-primary mb-2"
            />
            <SectionSubtitle
              text="আমাদের সবথেকে জনপ্রিয় বইগুলো দেখে নিন"
              className="text-primary/70 max-w-2xl mx-auto"
            />
          </div>

          <ContainerMax>
            <div className="mt-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 justify-between mt-5">
                {bestSellingProducts?.slice(0, 4)?.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            </div>
            {bestSellingProducts.length > 4 && (
              <div className="flex justify-center mt-5">
                <Button asChild size={"sm"} className="px-6">
                  <Link href={"/shop?best-selling=true"}>সবগুলো দেখুন</Link>
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
