import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sprout, Wind } from "lucide-react";
import Link from "next/link";

const SustainabilityBanner = () => {
  return (
    <section className="py-8 md:py-12">
      <ContainerMax>
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#0F392B] via-[#1B4D3E] to-[#164234] text-white p-6 sm:p-10 md:p-12 shadow-md border border-primary/30">
          {/* Subtle organic light reflections */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 size-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 size-60 bg-emerald-300/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
                <Sprout className="size-3.5 text-emerald-300" />
                <span>Our Eco Commitment</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                1 Order = 1 Tree Planted · Sourced With Care
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 leading-relaxed">
                We believe beauty and wellness should flourish in harmony with nature. Every order contributes to our native tree planting initiative and utilizes 100% eco-conscious, recyclable packaging.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-emerald-200">
                <div className="flex items-center gap-2">
                  <Leaf className="size-4 text-emerald-300" />
                  <span>18,400+ Trees Planted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="size-4 text-emerald-300" />
                  <span>Carbon-Neutral Delivery</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-[#0F392B] hover:bg-emerald-50 font-semibold px-6 shadow-sm text-sm"
              >
                <Link href="/about-us" className="flex items-center gap-2">
                  <span>Discover Our Story</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </ContainerMax>
    </section>
  );
};

export default SustainabilityBanner;
