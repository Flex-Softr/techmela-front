import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Sparkles, Search } from "lucide-react";

const ShopBanner = () => {
  return (
    <div className="mt-4 relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-primary-foreground">
      {/* Decorative blurred circles */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary-foreground/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl pointer-events-none" />
      {/* Subtle decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            white 40px,
            white 41px
          )`,
        }}
      />

      <ContainerMax>
        <div className="relative py-4 md:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Text block */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/15 rounded-xl backdrop-blur-sm flex-shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl md:text-2xl font-bold leading-snug">
                আমাদের সকল পণ্য
              </h1>
              <p className="text-xs sm:text-sm text-primary-foreground/80 mt-0.5 leading-relaxed">
                স্মার্ট গ্যাজেট, এক্সেসরিজ ও ইলেকট্রনিক্সের বিশাল কালেকশন থেকে আপনার পছন্দেরটি বেছে নিন
              </p>
            </div>
          </div>

          {/* Chip — hidden on very small mobile to avoid crowding */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-sm px-3 py-1.5 rounded-xl text-sm font-medium">
              <Search className="w-4 h-4" />
              <span>ফিল্টার ও অনুসন্ধান</span>
            </div>
          </div>
        </div>
      </ContainerMax>
    </div>
  );
};

export default ShopBanner;
