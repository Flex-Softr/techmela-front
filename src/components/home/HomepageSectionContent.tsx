import ContainerMax from "@/components/containerMax/ContainerMax";
import ProductCard from "@/components/productCards/ProductCard";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { THomePageSection } from "@/types/homepageSection";
import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import Link from "next/link";

const HomepageSectionContent = async ({
  content,
}: {
  content: THomePageSection;
}) => {
  const contentId = content?._id;

  const { data } = await serverSideFetcher<TProduct[]>({
    url: `/homepage-sections/content/${contentId}`,
    tags: [`homepageSections-${content?.collectionId}`],
  });
  const products = data;

  return (
    <section className="pt-10 md:pt-12">
      <ContainerMax>
        <div className="mt-5">
          {content?.title && (
            <>
              <SectionTitle title={content?.title} />
            </>
          )}
          {content?.subtitle && (
            <>
              <SectionSubtitle text={content?.subtitle} />
            </>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 justify-between mt-5">
            {products?.slice(0, 4)?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
        {content?.ctaText && content?.ctaLink && (
          <div className="flex justify-center mt-5">
            <Button asChild size={"sm"} className="px-6">
              <Link href={content?.ctaLink}>{content?.ctaText}</Link>
            </Button>
          </div>
        )}
      </ContainerMax>
    </section>
  );
};

export default HomepageSectionContent;
