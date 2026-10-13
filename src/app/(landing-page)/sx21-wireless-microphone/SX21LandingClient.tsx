"use client";

import eventHandler from "@/tracking/eventHandler";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TSingleProduct } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import { useEffect, useRef, useState } from "react";
import { getImageSrc } from "@/lib/utils";

// Scoped SolaimanLipi Font & Stylesheet
import "./sx21.css";

// Shared Landing Page Components
import AnnouncementBar from "@/app/(landing-page)/_components/AnnouncementBar";
import SalesHeader from "@/app/(landing-page)/_components/SalesHeader";
import SalesOrderForm from "@/app/(landing-page)/_components/SalesOrderForm";
import PricingDisplay from "@/app/(landing-page)/_components/PricingDisplay";
import CTAButtonGroup from "@/app/(landing-page)/_components/CTAButtonGroup";

// Modular Sections
import HeroSection from "./components/HeroSection";
import ComparisonSection from "./components/ComparisonSection";
import VideoSection from "./components/VideoSection";
import ProductCarousel from "./components/ProductCarousel";
import FeatureHighlights from "./components/FeatureHighlights";
import WhoIsItFor from "./components/WhoIsItFor";
import BoxContents from "./components/BoxContents";
import FAQSection from "./components/FAQSection";
import TrustGuarantees from "./components/TrustGuarantees";

type Props = {
  product: TSingleProduct | null;
  shippingCharges: TShippingCharges[];
  paymentMethods: TPaymentMethod[];
  fallbackRegularPrice?: number;
  fallbackSalePrice?: number;
  defaultThumbnail?: string;
};

const SX21_DETAILS = {
  title: "SX21 ওয়্যারলেস ম্যাজিক মাইক্রোফোন (ANC + ইকো মোড)",
  highlights: [
    {
      icon: "🎙️",
      title: "ডুয়াল মাইক্রোফোন",
      description: "একসাথে ২ জন মানুষ কোনো ল্যাগ ছাড়া কথা রেকর্ড করতে পারবেন।",
    },
    {
      icon: "🔇",
      title: "ANC নয়েজ ক্যান্সেলেশন",
      description: "বাইরের কোলাহল ও বাতাসের শব্দ স্বয়ংক্রিয়ভাবে ফিল্টার করে।",
    },
    {
      icon: "✨",
      title: "ম্যাজিক ইকো মোড",
      description: "কিরাত, নাত ও ইসলামী আলোচনায় দেয় মধুর স্টুডিও রিভার্ব সাউন্ড।",
    },
    {
      icon: "📱",
      title: "প্লাগ অ্যান্ড প্লে",
      description: "কোনো অ্যাপ বা ব্লুটুথ সংযোগ ছাড়াই ফোনে লাগালেই চালু।",
    },
  ],
  pages: "Android Type-C + iPhone OTG",
  scholars: "৪.৯/৫ রেটিং",
  testimonials: [],
};

const SX21LandingClient = ({
  product,
  shippingCharges,
  paymentMethods,
  fallbackRegularPrice = 1030,
  fallbackSalePrice = 890,
  defaultThumbnail = "/images/landing-page/sx21/sx21-charging-case-open.jpg",
}: Props) => {
  const orderFormRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [lastTrackedCart, setLastTrackedCart] = useState<string>("");
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Dynamic Pricing from product data with fallbacks
  const productPricing = product as unknown as {
    pricing?: { regularPrice?: number; salePrice?: number };
  } | null;

  const regularPrice =
    product?.price?.regularPrice ||
    productPricing?.pricing?.regularPrice ||
    fallbackRegularPrice ||
    1030;
  const salePrice =
    product?.price?.salePrice ||
    productPricing?.pricing?.salePrice ||
    fallbackSalePrice ||
    890;

  const thumbnailSrc =
    getImageSrc(product?.thumbnail?.src) || defaultThumbnail;

  const productTitle = product?.title || SX21_DETAILS.title;
  const productId = product?._id || "sx21-wireless-microphone";

  // Track ViewContent
  const hasTrackedViewRef = useRef(false);
  useEffect(() => {
    if (!hasTrackedViewRef.current) {
      hasTrackedViewRef.current = true;
      eventHandler({
        event_name: "view_content",
        content_name: productTitle,
        content_ids: [productId],
        content_type: "product",
        content_category: product?.category?.[0]?.name || "Microphones",
        contents: [
          {
            id: productId,
            quantity: 1,
            item_price: salePrice,
            name: productTitle,
            brand: product?.brand?.name || "SX21",
            category: product?.category?.[0]?.name || "Wireless Microphones",
          },
        ],
        value: salePrice,
      });
    }
  }, [productId, productTitle, salePrice, product]);

  // Show/hide floating mobile order button on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToOrder = () => {
    orderFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleOrderNow = () => {
    const currentKey = `${productId}-simple-${quantity}`;
    if (currentKey !== lastTrackedCart) {
      eventHandler({
        event_name: "add_to_cart",
        content_name: productTitle,
        content_ids: [productId],
        content_type: "product",
        content_category: product?.category?.[0]?.name || "Microphones",
        contents: [
          {
            id: productId,
            quantity,
            item_price: salePrice,
            name: productTitle,
            brand: product?.brand?.name || "SX21",
            category: product?.category?.[0]?.name || "Wireless Microphones",
          },
        ],
        value: salePrice * quantity,
      });
      setLastTrackedCart(currentKey);
    }
    scrollToOrder();
  };

  const cartItems = [
    {
      productId: productId,
      variation: null,
      quantity: quantity,
    },
  ];

  return (
    <div className="sx21-page min-h-screen bg-white selection:bg-primary/20 selection:text-primary">
      {/* 1. Top Announcement Marquee */}
      <AnnouncementBar />

      {/* 2. Sticky Sales Header with Call / WhatsApp and Order Button */}
      <SalesHeader onOrderClick={handleOrderNow} />

      {/* 3. Hero Showcase Section (Focused on budget, ANC + Echo mode) */}
      <HeroSection
        onOrderClick={handleOrderNow}
        thumbnailSrc={thumbnailSrc}
        regularPrice={regularPrice}
        salePrice={salePrice}
        productTitle={productTitle}
      />

      {/* 4. Comparison Section (Ordinary Phone Mic vs SX21 Magic Mic) */}
      <ComparisonSection />

      {/* 5. Two Live Videos Section (Unboxing, sound test, and connection demo) */}
      <VideoSection />

      {/* 6. Raw Photo Carousel (Multi-angle real shots of the microphone) */}
      <ProductCarousel />

      {/* 7. Key Feature Highlights (ANC, Echo, Dual Mic, Battery, etc.) */}
      <FeatureHighlights />

      {/* 8. Who is it for? (Madrasa students, Imams, Educational creators, Vloggers) */}
      <WhoIsItFor />

      {/* 9. Box Contents (Including iPhone OTG Adapter) */}
      <BoxContents />

      {/* 10. Mid-page Urgency Offer Banner (Under 1000 TK budget focus) */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950 border-2 border-emerald-500/30 p-8 sm:p-14 text-center shadow-2xl backdrop-blur-md">
            
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Badge */}
            <div className="relative z-10 inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-lg mb-5 animate-bounce">
              🔥 মাত্র ৮৯০ টাকায় ধামাকা অফার — সীমিত স্টক!
            </div>

            {/* Main Headline */}
            <h2 className="relative z-10 text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl mx-auto">
              স্বল্প বাজেটে সেরা কোয়ালিটির{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500">
                ওয়্যারলেস ম্যাজিক মাইক্রোফোন
              </span>
            </h2>

            {/* High-Contrast Pricing Box */}
            <div className="relative z-10 flex justify-center my-6">
              <div className="inline-flex flex-col items-center justify-center bg-black/50 border border-white/15 rounded-2xl px-8 py-5 shadow-inner backdrop-blur-md">
                <span className="text-xs sm:text-sm text-slate-300 font-bold mb-1">
                  বিশেষ অফার মূল্য:
                </span>
                <PricingDisplay
                  regularPrice={regularPrice}
                  salePrice={salePrice}
                  isLarge={true}
                  priceColor="text-amber-400"
                  regularPriceColor="text-slate-400"
                  discountColor="text-emerald-400"
                  className="items-center"
                />
              </div>
            </div>

            {/* Explanatory Text */}
            <p className="relative z-10 text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              স্টক শেষ হওয়ার আগেই আপনার পছন্দের <strong className="text-white">SX21 ডুয়াল ওয়্যারলেস ম্যাজিক মাইক্রোফোনটি</strong> ক্যাশ অন ডেলিভারিতে অর্ডার করুন। কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই।
            </p>

            {/* Trust Points */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 text-sm sm:text-base text-slate-200 pt-5 pb-3">
              <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                ✓ সারাদেশে ক্যাশ অন ডেলিভারি
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1.5 text-blue-300 font-semibold">
                ✓ পার্সেল চেক করে মূল্য পরিশোধ
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1.5 text-amber-300 font-bold bg-amber-500/20 border border-amber-400/40 px-3.5 py-1.5 rounded-full shadow-xs">
                🛡️ ৩ মাসের রিপ্লেসমেন্ট গ্যারান্টি
              </span>
            </div>

            {/* CTA Button */}
            <div className="relative z-10 flex justify-center pt-3">
              <CTAButtonGroup
                onOrderClick={handleOrderNow}
                className="justify-center"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 12. Frequently Asked Questions */}
      <FAQSection />

      {/* 13. Sales Order Form Section (Smooth scroll target) */}
      <section
        ref={orderFormRef}
        id="order-form"
        className="py-14 sm:py-20 bg-slate-100 border-t border-slate-300 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Form Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-3">
              <span className="bg-emerald-600 text-white font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs">
                সারাদেশে ক্যাশ অন ডেলিভারি
              </span>
              <span className="bg-amber-500 text-slate-950 font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
                <span>🛡️</span>
                <span>৩ মাসের রিপ্লেসমেন্ট গ্যারান্টি</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
              অর্ডার করতে নিচের ফর্মটি সঠিকভাবে পূরণ করুন
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
              পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধ করবেন। সাথে পাচ্ছেন সম্পূর্ণ <strong className="text-slate-900 font-bold">৩ মাসের ফ্রি রিপ্লেসমেন্ট সুবিধা!</strong>
            </p>
          </div>

          {/* Actual Sales Order Form Component (Variations loaded dynamically inside) */}
          <div className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl border border-slate-200">
            <SalesOrderForm
              lpNo="LP-SX21-01"
              shippingCharges={shippingCharges}
              paymentMethods={paymentMethods}
              productTitle={productTitle}
              cartItems={cartItems}
              thumbnailSrc={thumbnailSrc}
              fallbackPrice={salePrice}
              quantity={quantity}
              setQuantity={setQuantity}
              bookDetails={SX21_DETAILS}
              product={product}
              salePrice={salePrice}
              regularPrice={regularPrice}
            />
          </div>

        </div>
      </section>

      {/* 14. Trust & Guarantees */}
      <TrustGuarantees />

      {/* 15. Sticky Bottom Bar on Mobile for Instant Conversion */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
          <div>
            <p className="text-[11px] text-slate-500 font-bold">অফার মূল্য:</p>
            <p className="text-xl font-black text-primary leading-none">
              &#2547;{salePrice * quantity}
            </p>
          </div>
          <button
            onClick={handleOrderNow}
            className="flex-1 max-w-[200px] py-3 px-4 bg-primary text-primary-foreground font-black text-sm rounded-full shadow-lg hover:bg-primary/90 active:scale-95 transition-all text-center"
          >
            অর্ডার করুন ➔
          </button>
        </div>
      )}
    </div>
  );
};

export default SX21LandingClient;
