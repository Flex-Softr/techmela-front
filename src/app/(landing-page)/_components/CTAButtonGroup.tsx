"use client";
import { useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import BookPreviewModal from "@/components/shared/BookPreviewModal/BookPreviewModal";

type Props = {
  onOrderClick: () => void;
  onPreviewClick?: () => void;
  previewLink?: string;
  bookTitle?: string;
  className?: string;
};

const CTAButtonGroup = ({
  onOrderClick,
  onPreviewClick,
  previewLink,
  bookTitle,
  className = "",
}: Props) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreviewClick = () => {
    if (onPreviewClick) {
      onPreviewClick();
    }
    if (previewLink) {
      setIsPreviewOpen(true);
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${className}`}
    >
      <button
        onClick={onOrderClick}
        className="w-full sm:w-auto px-7 py-3 bg-primary text-primary-foreground text-base font-black rounded-full hover:bg-primary/90 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 group relative overflow-hidden animate-pulse-glow tracking-wide"
      >
        <span className="relative z-10">এখনই অর্ডার করুন</span>
        <FiArrowDown className="text-lg group-hover:translate-y-1 transition-transform relative z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-shimmer"></div>
      </button>

      {(onPreviewClick || previewLink) && (
        <button
          onClick={handlePreviewClick}
          className="w-full sm:w-auto px-7 py-3 bg-white text-primary border-2 border-primary/20 text-base font-black rounded-full hover:bg-primary/5 transition-all active:scale-95 flex items-center justify-center gap-3 group/preview shadow-sm tracking-wide"
        >
          <span className="text-xl group-hover/preview:animate-bounce-subtle">
            📖
          </span>
          একটু পড়ে দেখুন
        </button>
      )}

      {previewLink && (
        <BookPreviewModal
          isOpen={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
          previewLink={previewLink}
          title={bookTitle || ""}
        />
      )}

      <style jsx>{`
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow:
              0 10px 15px -3px hsla(var(--primary) / 0.2),
              0 4px 6px -4px hsla(var(--primary) / 0.2);
          }
          50% {
            box-shadow:
              0 15px 25px -5px hsla(var(--primary) / 0.3),
              0 10px 10px -5px hsla(var(--primary) / 0.3);
          }
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CTAButtonGroup;
