import ContainerMax from "@/components/shared/containerMax/ContainerMax";

const BannerSkeleton = () => {
  return (
    <section className="mt-4 animate-pulse">
      <ContainerMax>
        <div className="w-full h-[200px] sm:h-[300px] md:h-[420px] lg:h-[500px] bg-muted rounded-2xl md:rounded-3xl" />
      </ContainerMax>
    </section>
  );
};

export default BannerSkeleton;
