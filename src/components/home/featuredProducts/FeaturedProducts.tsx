import ProductCard from "@/components/productCards/ProductCard";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import Link from "next/link";

const FeaturedProducts = async () => {
  const { data: featuredProducts = [] } = await serverSideFetcher<TProduct[]>({
    url: "/products/featured",
    tags: ["featuredProducts"],
  });

  return (
    <>
      {featuredProducts.length > 0 && (
        <section className="pt-10 md:pt-12">
          <div className="bg-primary/5 py-2 md:py-3 px-4 mb-4 text-center border border-primary/10 shadow-sm">
            <SectionTitle
              title="নির্বাচিত বইসমূহ"
              className="text-primary mb-2"
            />
            <SectionSubtitle
              text="আমাদের নির্বাচিত বইগুলোর কালেকশন দেখুন"
              className="text-primary/70 max-w-2xl mx-auto"
            />
          </div>

          <ContainerMax>
            <div className="mt-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 justify-between mt-5">
                {featuredProducts?.slice(0, 4)?.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            </div>
            {featuredProducts.length > 4 && (
              <div className="flex justify-center mt-5">
                <Button asChild size={"sm"} className="px-6">
                  <Link href={"/shop?featured=true"}>সবগুলো দেখুন</Link>
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
