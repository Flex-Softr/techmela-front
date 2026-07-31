import ContainerMax from "@/components/shared/containerMax/ContainerMax";

const CategorySectionSkeleton = () => {
  return (
    <section className="pt-4 md:pt-6 animate-pulse">
      {/* Title & Subtitle Skeleton */}
      <div className="bg-muted py-2 md:py-3 px-4 md:mb-4 text-center border border-border shadow-sm">
        <div className="h-4 bg-muted w-32 mx-auto mb-2 rounded" />
        <div className="h-3 bg-muted w-48 mx-auto rounded" />
      </div>

      <ContainerMax>
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 py-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full" />
              <div className="h-3 bg-muted w-12 rounded" />
            </div>
          ))}
        </div>
      </ContainerMax>
    </section>
  );
};

export default CategorySectionSkeleton;
