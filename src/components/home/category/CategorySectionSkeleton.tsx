import ContainerMax from "@/components/shared/containerMax/ContainerMax";

const CategorySectionSkeleton = () => {
  return (
    <section className="py-6 md:py-10 animate-pulse">
      {/* Title & Subtitle Skeleton */}
      <div className="mb-6 px-4 text-center md:mb-8 flex flex-col items-center">
        <div className="h-1 w-10 rounded-full bg-muted mb-2.5" />
        <div className="h-6 bg-muted w-44 rounded-lg mb-2" />
        <div className="h-4 bg-muted w-72 rounded-lg" />
      </div>

      <ContainerMax>
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3 md:gap-4">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl border border-border/70 p-3 sm:p-4 flex flex-col items-center justify-center min-h-[112px] sm:min-h-[124px] space-y-2.5"
            >
              <div className="size-10 sm:size-11 bg-muted rounded-xl" />
              <div className="h-3 bg-muted w-14 rounded" />
            </div>
          ))}
        </div>
      </ContainerMax>
    </section>
  );
};

export default CategorySectionSkeleton;
