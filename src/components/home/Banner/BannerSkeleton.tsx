import ContainerMax from "@/components/shared/containerMax/ContainerMax";

const BannerSkeleton = () => {
  return (
    <section className="mt-4 animate-pulse">
      <ContainerMax>
        <div className="w-full h-[200px] sm:h-[300px] md:h-[380px] lg:h-[460px] bg-gray-200 rounded-xl" />
      </ContainerMax>
    </section>
  );
};

export default BannerSkeleton;
