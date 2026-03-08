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
    tags: ["homepageIndividualSection", `homepageSections-${contentId}`],
  });

  const products = data || [];

  return (
    <>
      {products.length > 0 && (
        <section className="pt-10 md:pt-12">
          {(content?.title || content?.subtitle) && (
            <div className="bg-primary/5 py-2 md:py-3 px-4 mb-4 text-center border border-primary/10 shadow-sm">
              {content?.title && (
                <SectionTitle
                  title={content?.title}
                  className="text-primary mb-2"
                />
              )}
              {content?.subtitle && (
                <SectionSubtitle
                  text={content?.subtitle}
                  className="text-primary/70 max-w-2xl mx-auto"
                />
              )}
            </div>
          )}

          <ContainerMax>
            <div className="mt-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 justify-between mt-5">
                {products?.slice(0, 4)?.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            </div>

            {products.length > 4 && content?.ctaText && content?.ctaLink ? (
              <div className="flex justify-center mt-5">
                <Button asChild size={"sm"} className="px-6">
                  <Link href={content?.ctaLink}>{content?.ctaText}</Link>
                </Button>
              </div>
            ) : (
              <>
                {products.length > 4 && (
                  <div className="flex justify-center mt-5">
                    <Button asChild size="sm" className="px-6">
                      <Link
                        href={`/shop?collection=${
                          typeof content?.collectionId === "object"
                            ? content?.collectionId?.slug
                            : content?.collectionId
                        }`}
                      >
                        সবগুলো দেখুন
                      </Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </ContainerMax>
        </section>
      )}
    </>
  );
};

export default HomepageSectionContent;
