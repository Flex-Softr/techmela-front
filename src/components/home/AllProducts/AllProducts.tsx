import ContainerMax from "@/components/containerMax/ContainerMax";
import ProductCard from "@/components/productCards/ProductCard";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
// import SectionTitle from "@/components/sectionTitle/SectionTitle";
import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import Link from "next/link";

const AllProducts = async () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { data } = await serverSideFetcher<any>({
    url: "/products",
    tags: ["products"],
  });
  const products = data as TProduct[];
  return (
    <section className="pt-10 md:pt-12">
      <ContainerMax>
        <SectionTitle title="All products" />
        <SectionSubtitle text="Explore our wide range of products" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 justify-between mt-5">
          {products?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Button asChild size={"sm"} className="px-6">
            <Link href={"/shop"}>See more</Link>
          </Button>
        </div>
      </ContainerMax>
    </section>
  );
};

export default AllProducts;
