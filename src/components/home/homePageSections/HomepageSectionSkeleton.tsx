import ContainerMax from "@/components/shared/containerMax/ContainerMax";

const HomepageSectionSkeleton = () => {
  return (
    <section className="py-4 md:py-8 animate-pulse">
      <ContainerMax>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="h-6 bg-muted w-48 rounded" />
          <div className="h-4 bg-muted w-20 rounded" />
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 lg:gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-72 bg-muted rounded-xl" />
          ))}
        </div>
      </ContainerMax>
    </section>
  );
};

export default HomepageSectionSkeleton;
