import ContainerMax from "@/components/shared/containerMax/ContainerMax";

const HomepageSectionSkeleton = () => {
  return (
    <section className="py-4 md:py-8 animate-pulse">
      <ContainerMax>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="h-6 bg-gray-200 w-48 rounded" />
          <div className="h-4 bg-gray-200 w-20 rounded" />
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-72 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </ContainerMax>
    </section>
  );
};

export default HomepageSectionSkeleton;
