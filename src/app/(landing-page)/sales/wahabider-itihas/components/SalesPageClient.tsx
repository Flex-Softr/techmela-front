"use client";

import Facilities from "@/components/home/facilities/Facilities";
import config from "@/config/config";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TSingleProduct, Tvariations } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaClock, FaMoneyBillWave, FaQuoteLeft, FaTruck } from "react-icons/fa";
import { FiArrowRight, FiMinus, FiPlus } from "react-icons/fi";
import {
  MdCall,
  MdCampaign,
  MdCheckCircle,
  MdMenuBook,
  MdShoppingBag,
  MdStar,
  MdVerified,
} from "react-icons/md";
import SalesOrderForm from "./SalesOrderForm";

type Props = {
  product: TSingleProduct | undefined;
  shippingCharges: TShippingCharges[];
  paymentMethods: TPaymentMethod[];
};

const BOOK_DETAILS = {
  title: "ওয়াহাবিদের ইতিহাস", // Fallback for safety
  author: "ইয়াসির আরাফাত আল হিন্দী",
  pages: "৩৩৫",
  publisher: "সিদ্দীকিয়া প্রকাশনী",
  scholars: "৮৫+",
  rating: 5,
  reviewCount: 6,
  highlights: [
    {
      icon: "📖",
      title: "দুই পর্বে সাজানো",
      description:
        "প্রথম পর্বে নজদের ইতিহাস ও মুহাম্মদ ইবনু আব্দিল ওয়াহহাবের জীবনকথা। দ্বিতীয় পর্বে ওয়াহাবী মতাদর্শ ও আকাবিরদের প্রকৃত অবস্থান।",
    },
    {
      icon: "🕌",
      title: "৮৫+ মহান ইমামের বক্তব্য",
      description:
        "প্রতিটি তথ্যের পক্ষে উপযুক্ত শরয়ী দালায়েল ও ৮৫ জন বরেণ্য মুজতাহিদ ইমাম এবং মনীষীর মতামত সংকলিত।",
    },
    {
      icon: "🌍",
      title: "ঐতিহাসিক প্রেক্ষাপট",
      description:
        "ফিলিস্তিন সমস্যায় ওয়াহাবিদের ভূমিকা এবং সৌদি আরব প্রতিষ্ঠার ইতিহাস তদানীন্তন উলামায়ে কিরামের বক্তব্যসহ।",
    },
    {
      icon: "✅",
      title: "দালিলিক ও নিরপেক্ষ আলোচনা",
      description:
        "পক্ষ-বিপক্ষ উভয় মতামত এনে নিরপেক্ষ ও দালিলিক আলোচনা — বিদআত নিয়ে মুজতাহিদ ইমামদের ব্যাখ্যার আলোকে।",
    },
  ],
  testimonials: [
    {
      name: "আব্দুর রহমান",
      location: "ঢাকা",
      rating: 5,
      text: "অত্যন্ত প্রামাণিক ও তথ্যবহুল বই। এত সুন্দরভাবে ইতিহাস উপস্থাপন করা হয়েছে যা আগে কোথাও দেখিনি।",
    },
    {
      name: "মুহাম্মাদ ইউসুফ",
      location: "চট্টগ্রাম",
      rating: 5,
      text: "আলহামদুলিল্লাহ, এই বইটি পড়ে অনেক ভুল ধারণা দূর হয়েছে। সিদ্দীকিয়া প্রকাশনীকে ধন্যবাদ।",
    },
    {
      name: "আনিস হোসাইন",
      location: "সিলেট",
      rating: 5,
      text: "বইটির রেফারেন্স ও দালায়েল অত্যন্ত শক্তিশালী। সকল মুসলিমের পড়া উচিত।",
    },
  ],
};

const SalesPageClient = ({
  product,
  shippingCharges,
  paymentMethods,
}: Props) => {
  const orderFormRef = useRef<HTMLDivElement>(null);
  const [selectedVariation, setSelectedVariation] =
    useState<Tvariations | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [lastTrackedCart, setLastTrackedCart] = useState<string>("");

  const [cartItems, setCartItems] = useState<
    {
      productId: string;
      variation: Tvariations | null;
      quantity: number;
      isDefault?: boolean;
    }[]
  >([]);

  // Fire ViewContent event on mount
  useEffect(() => {
    if (product) {
      gtmEventHandler({
        event: "view_content",
        content_name: product.title,
        content_ids: [product._id],
        content_type: "product",
        value: product.price?.salePrice || product.price?.regularPrice,
        currency: "BDT",
      });
    }
  }, [product]);

  // Persistent Cart Sync: REMOVED to avoid the Cart API as requested

  // Auto-select first in stock variation and sync attributes
  useEffect(() => {
    if (
      product &&
      product.type !== "simple" &&
      product.variations &&
      product.variations.length > 0 &&
      !selectedVariation
    ) {
      const inStock = product.variations.filter(
        (v) =>
          v.inventory?.stockStatus === "in_stock" || !v.inventory?.stockStatus
      );
      const initial = inStock.length > 0 ? inStock[0] : product.variations[0];
      setSelectedVariation(initial);
      setSelectedAttributes(initial.attributes);
    }
  }, [product, selectedVariation]);

  // Keep simple product cart perfectly in sync with the quantity state
  useEffect(() => {
    if (!product) return;
    if (product.type === "simple") {
      setCartItems([
        { productId: product._id, variation: null, quantity, isDefault: true },
      ]);
    }
  }, [product, quantity]);

  // Sync the default cart slot whenever selectedVariation changes for variable products
  useEffect(() => {
    if (!product || product.type === "simple" || !selectedVariation) return;

    const productId = product._id;

    setCartItems((prev) => {
      // If the cart is empty, add the current variation as the first item
      if (prev.length === 0) {
        return [
          {
            productId,
            variation: selectedVariation,
            quantity: 1,
            isDefault: true,
          },
        ];
      }

      // Find the "default" item
      const defaultIdx = prev.findIndex((i) => i.isDefault);

      if (defaultIdx !== -1) {
        // Update it to the new variation
        const updated = [...prev];
        updated[defaultIdx] = {
          ...updated[defaultIdx],
          variation: selectedVariation,
        };
        return updated;
      }

      // No default slot found — just leave the cart as-is
      return prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariation, product]);

  // Sync selectedVariation when attributes change
  useEffect(() => {
    if (product?.variations) {
      const match = product.variations.find((v) =>
        Object.entries(selectedAttributes).every(
          ([key, value]) => v.attributes[key] === value
        )
      );
      if (match && match._id !== selectedVariation?._id) {
        setSelectedVariation(match);
      }
    }
  }, [selectedAttributes, product?.variations, selectedVariation?._id]);

  const handleAttributeSelect = (name: string, value: string) => {
    setSelectedAttributes((prev) => {
      const newAttrs = { ...prev, [name]: value };

      // Check if this combination exists
      const exists = product?.variations?.some((v) =>
        Object.entries(newAttrs).every(([k, val]) => v.attributes[k] === val)
      );

      if (!exists && product?.variations) {
        // Find a variation that matches the newly selected attribute and as many others as possible
        const bestMatch = product.variations.find(
          (v) => v.attributes[name] === value
        );
        if (bestMatch) return bestMatch.attributes;
      }

      return newAttrs;
    });
  };

  // Primary CTA: scroll to form (cart already has the current selection via the sync effect)
  const handleOrderNow = () => {
    if (!product) return;

    // For simple products, directly apply the local quantity state
    if (product.type === "simple") {
      const currentKey = `${product._id}-simple-${quantity}`;
      if (currentKey !== lastTrackedCart) {
        gtmEventHandler({
          event: "add_to_cart",
          content_name: product.title,
          content_ids: [product._id],
          content_type: "product",
          value:
            (product.price?.salePrice || product.price?.regularPrice || 0) *
            quantity,
          currency: "BDT",
          contents: [
            {
              id: product._id,
              quantity,
              item_price:
                product.price?.salePrice || product.price?.regularPrice || 0,
            },
          ],
        });
        setLastTrackedCart(currentKey);
      }

      setCartItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.variation === null);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: quantity, // Override with selected quantity
            isDefault: false,
          };
          return updated;
        }
        return [
          {
            productId: product._id,
            variation: null,
            quantity,
            isDefault: false,
          },
        ];
      });
      scrollToOrder();
      return;
    }

    // GTM: add_to_cart for variable product
    const currentVarKey = `${product._id}-${selectedVariation?._id}-${quantity}`;
    if (currentVarKey !== lastTrackedCart) {
      gtmEventHandler({
        event: "add_to_cart",
        content_name: product.title,
        content_ids: [selectedVariation?._id || product._id],
        content_type: "product",
        value:
          (selectedVariation?.price?.salePrice ||
            selectedVariation?.price?.regularPrice ||
            product.price?.salePrice ||
            0) * quantity,
        currency: "BDT",
        contents: [
          {
            id: selectedVariation?._id || product._id,
            quantity,
            item_price:
              selectedVariation?.price?.salePrice ||
              selectedVariation?.price?.regularPrice ||
              product.price?.salePrice ||
              0,
          },
        ],
      });
      setLastTrackedCart(currentVarKey);
    }

    // Ensure the current selection is in the cart before scrolling
    setCartItems((prev) => {
      const existsIdx = prev.findIndex(
        (i) => i.variation?._id === selectedVariation?._id
      );
      if (existsIdx > -1) {
        // Ensure it's marked as explicitly added (no longer default)
        const updated = [...prev];
        updated[existsIdx] = {
          ...updated[existsIdx],
          isDefault: false,
        };
        return updated;
      }
      return [
        ...prev.filter((i) => !i.isDefault),
        {
          productId: product._id,
          variation: selectedVariation,
          quantity,
          isDefault: false,
        },
      ];
    });
    scrollToOrder();
  };

  // Secondary: explicitly add another variation slot to the cart
  const handleAddAnotherVariation = () => {
    if (!product || !selectedVariation) return;

    // GTM: add_to_cart for another variation
    const anotherVarKey = `${product._id}-${selectedVariation._id}-${quantity}`;
    if (anotherVarKey !== lastTrackedCart) {
      gtmEventHandler({
        event: "add_to_cart",
        content_name: product.title,
        content_ids: [selectedVariation._id],
        content_type: "product",
        value:
          (selectedVariation.price?.salePrice ||
            selectedVariation.price?.regularPrice ||
            product.price?.salePrice ||
            0) * quantity,
        currency: "BDT",
        contents: [
          {
            id: selectedVariation._id,
            quantity,
            item_price:
              selectedVariation.price?.salePrice ||
              selectedVariation.price?.regularPrice ||
              product.price?.salePrice ||
              0,
          },
        ],
      });
      setLastTrackedCart(anotherVarKey);
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.variation?._id === selectedVariation?._id
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        const isDefault = newCart[existingIndex].isDefault;
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: isDefault
            ? quantity
            : newCart[existingIndex].quantity + quantity,
          isDefault: false,
        };
        return newCart;
      }

      const withoutDefault = prev.filter((i) => !i.isDefault);

      return [
        ...withoutDefault,
        {
          productId: product._id,
          variation: selectedVariation,
          quantity,
          isDefault: false,
        },
      ];
    });

    setQuantity(1); // Reset quantity after adding
  };

  const removeItem = (variationId?: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.variation?._id !== variationId)
    );
  };

  const updateItemQuantity = (
    variationId: string | undefined,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.variation?._id === variationId) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const getUniqueAttributeValues = (key: string) => {
    if (!product?.variations) return [];
    return Array.from(
      new Set(product.variations.map((v) => v.attributes[key]))
    ).filter(Boolean);
  };

  const attributeKeys = product?.variations?.[0]?.attributes
    ? Object.keys(product.variations[0].attributes)
    : [];

  // No direct cart sync here — SalesOrderForm's useOrderSubmit reads the cart from Redux
  // and the order is created with the correct product via the checkout hooks.

  // Handle sticky form observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (orderFormRef.current) observer.observe(orderFormRef.current);
    return () => observer.disconnect();
  }, [setIsFormVisible]);

  const scrollToOrder = () => {
    orderFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const regularPrice =
    selectedVariation?.price?.regularPrice ?? product?.price?.regularPrice ?? 0;
  const salePrice =
    selectedVariation?.price?.salePrice ??
    product?.price?.salePrice ??
    regularPrice;
  const discount =
    regularPrice > salePrice
      ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
      : 0;

  const rawThumbnailSrc = product?.thumbnail?.src;

  const thumbnailSrc = rawThumbnailSrc?.replace(/\\/g, "/");

  return (
    <div className="min-h-screen bg-white font-bengali">
      {/* ───── BRAND HEADER ───── */}
      <header className="bg-white py-3 shadow-sm flex items-center justify-between sticky top-0 z-50 border-b border-gray-100 px-4 lg:px-10">
        <Link href="/">
          <Image
            src="/images/logo/logo.png"
            alt="Siddikia Prokashoni"
            width={160}
            height={44}
            className="object-contain"
            priority
          />
        </Link>

        {/* Header CTA for desktop and mobile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-full border border-primary/20 font-bold text-sm">
            <MdCall className="text-lg" />
            <span>০১৬০২-৪৩১১৬৭</span>
          </div>
          <button
            onClick={handleOrderNow}
            className="bg-primary text-white text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold shadow-md hover:bg-primary/90 transition-transform active:scale-95"
          >
            অর্ডার করুন
          </button>
        </div>
      </header>

      {/* ───── TOP ANNOUNCEMENT BAR ───── */}
      <div className="bg-primary text-secondary-foreground py-2.5 text-sm font-semibold overflow-hidden relative flex flex-nowrap w-full">
        <div className="animate-marquee flex gap-12 whitespace-nowrap w-min">
          {/* We duplicate the span list to create a seamless infinite scrolling loop from 0% to -50% width */}
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-2">
              <MdCampaign className="text-lg" /> সীমিত সময়ের অফার — স্টক শেষ
              হওয়ার আগেই এখনই অর্ডার করুন!
            </span>
          ))}
        </div>
      </div>

      {/* ───── HERO SECTION ───── */}
      <section className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Book Cover */}
          <div className="flex justify-center xl:justify-start">
            <div className="relative w-full max-w-md lg:max-w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={thumbnailSrc ?? "/placeholder.jpg"}
                  alt={product?.title || "Book Cover"}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                  unoptimized
                />
              </div>
              {/* Discount badge */}
              {discount > 0 && (
                <div className="absolute -top-3 -right-3 bg-[#e43f4c] text-white rounded-full w-14 h-14 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-sm font-bold leading-tight">
                    {discount}%
                  </span>
                  <span className="text-[10px] leading-tight mt-0.5">ছাড়</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            {/* Publisher badge */}
            <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs font-bold border border-green-100 mb-1">
              <MdVerified className="text-sm" />
              সিদ্দীকিয়া প্রকাশনী
            </div>

            <div>
              <h1 className="text-4xl lg:text-[42px] font-extrabold text-gray-900 leading-[1.15] mb-2">
                {product?.title || BOOK_DETAILS.title}
              </h1>
              <div className="flex flex-col gap-1">
                <p className="text-lg text-gray-600 font-medium">
                  লেখক:{" "}
                  <span className="text-primary font-bold">
                    {BOOK_DETAILS.author}
                  </span>
                </p>
                {product?.shortDescription && (
                  <div
                    className="text-gray-500 text-sm lg:text-base leading-relaxed line-clamp-3 prose-sm"
                    dangerouslySetInnerHTML={{
                      __html: product.shortDescription,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <span className="text-[42px] lg:text-[48px] font-black text-primary leading-none tracking-tight">
                &#2547;{salePrice}
              </span>

              {regularPrice > salePrice && (
                <div className="flex items-center gap-3">
                  <span className="text-xl lg:text-2xl text-gray-500 line-through decoration-gray-500">
                    &#2547;{regularPrice}
                  </span>

                  <span className="bg-[#fff1f2] text-[#e11d48] text-[13px] font-bold px-2.5 py-1 rounded-md">
                    {discount}% Off
                  </span>

                  <span className="text-sm lg:text-base text-slate-500 font-medium ml-1">
                    Save: &#2547;{regularPrice - salePrice}
                  </span>
                </div>
              )}
            </div>

            {/* Variation selector */}
            {product?.type !== "simple" && attributeKeys.length > 0 && (
              <div className="space-y-4 pt-2">
                {attributeKeys.map((key) => (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row sm:items-center gap-2"
                  >
                    <p className="font-bold text-gray-800 min-w-[60px] text-lg capitalize">
                      {key}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getUniqueAttributeValues(key).map((val) => (
                        <button
                          key={val}
                          onClick={() => handleAttributeSelect(key, val)}
                          className={`px-4 py-1.5 rounded-lg border text-base font-bold transition-all ${
                            selectedAttributes[key] === val
                              ? "border-primary bg-primary text-white shadow-sm"
                              : "border-gray-200 bg-white text-gray-700 hover:border-primary/50"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 pt-4">
              <span className="font-bold text-gray-800">পরিমাণ:</span>
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-1.5 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <FiMinus className="text-gray-700 text-xl" />
                </button>
                <span className="w-12 text-center text-base font-bold text-gray-800 border-x border-gray-200 py-1.5 leading-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-1.5 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <FiPlus className="text-gray-700 text-xl" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 lg:max-w-2xl">
              {product?.inventory?.stockStatus === "out_of_stock" ? (
                <div className="flex-1 px-8 py-4 lg:py-5 bg-gray-200 text-gray-500 text-lg lg:text-xl font-bold rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed border border-gray-300 whitespace-nowrap">
                  অ্যাভেইলঅ্যাবল নেই
                </div>
              ) : (
                <div className="flex-[1.2] flex flex-col gap-2">
                  <button
                    onClick={handleOrderNow}
                    className="group w-full px-8 py-4 lg:py-5 bg-primary text-white text-lg lg:text-xl font-black rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] animate-pulse-gentle whitespace-nowrap"
                  >
                    অর্ডার করুন{" "}
                    <FiArrowRight className="text-xl lg:text-2xl group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  {product?.type !== "simple" && (
                    <button
                      onClick={scrollToOrder}
                      className="w-full px-4 py-2 text-sm font-bold text-primary border border-primary/40 rounded-xl hover:bg-primary/5 transition-all"
                    >
                      + অন্য ভেরিয়েশন যোগ করুন
                    </button>
                  )}
                </div>
              )}

              <a
                href={config.wahabider_itihas_preview_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 lg:py-5 bg-white text-primary text-lg lg:text-xl font-bold rounded-2xl border-2 border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-3 shadow-sm whitespace-nowrap"
              >
                <MdMenuBook className="text-2xl lg:text-3xl" />
                একটু পড়ে দেখুন
              </a>
            </div>

            {/* In-file styling for gentle pulse */}
            <style jsx>{`
              @keyframes pulse-gentle {
                0%,
                100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.02);
                }
              }
              .animate-pulse-gentle {
                animation: pulse-gentle 2s infinite ease-in-out;
              }
            `}</style>

            {/* Trust signals row */}
          </div>
        </div>
      </section>

      {/* ───── FACILITIES ───── */}
      <Facilities />

      {/* ───── BOOK HIGHLIGHTS ───── */}
      <section className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-center text-gray-900 mb-2">
            এই বইয়ে কী আছে?
          </h2>
          <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto text-sm">
            ওয়াহাবী মতাদর্শ ও তার ইতিহাস সম্পর্কে সবচেয়ে প্রামাণিক ও
            সুবিন্যস্ত বাংলা গ্রন্থ।
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BOOK_DETAILS.highlights.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-5 rounded-xl bg-white border border-gray-100 shadow-sm text-center"
              >
                <span className="text-3xl flex-shrink-0 p-3 mx-auto bg-gray-50 rounded-full text-primary w-min">
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── BOOK STATS / SOCIAL PROOF ───── */}
      <section className="bg-primary text-primary-foreground py-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-bg.png')] opacity-5" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              {
                value: BOOK_DETAILS.pages,
                label: "পৃষ্ঠা সংখ্যা",
                icon: (
                  <MdMenuBook className="text-3xl mx-auto mb-2 opacity-80" />
                ),
              },
              {
                value: `${BOOK_DETAILS.scholars} জন`,
                label: "ইমাম ও মনীষীর মত",
                icon: (
                  <MdVerified className="text-3xl mx-auto mb-2 opacity-80" />
                ),
              },
              {
                value: "৫/৫",
                label: "পাঠক রেটিং",
                icon: <MdStar className="text-3xl mx-auto mb-2 opacity-80" />,
              },
              {
                value: "২ পর্ব",
                label: "সুবিন্যস্ত অধ্যায়",
                icon: (
                  <MdCheckCircle className="text-3xl mx-auto mb-2 opacity-80" />
                ),
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 rounded-xl p-6 border border-white/10"
              >
                {stat.icon}
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SECONDARY CTA ───── */}
      <section className="bg-gray-50 py-10 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">
              বইটি সংগ্রহ করতে চান?
            </h3>
            <p className="text-lg text-gray-600 font-medium">
              মাত্র ৳{salePrice}-এ এখনই অর্ডার করুন! স্টক শেষ হওয়ার আগেই সংগ্রহ
              করুন।
            </p>
          </div>
          <button
            onClick={scrollToOrder}
            className="w-full md:w-auto px-12 py-4 lg:py-5 bg-primary text-white text-lg lg:text-xl font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            অর্ডার করুন <FiArrowRight className="text-2xl" />
          </button>
        </div>
      </section>

      {/* ───── ABOUT THE BOOK ───── */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">
              বইটি কেন পড়বেন?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                অষ্টাদশ শতাব্দীর প্রথমার্ধে নজদ অঞ্চলে উদ্ভূত মুহাম্মাদ ইবনু
                আব্দিল ওয়াহহাব প্রবর্তিত ওয়াহাবি মতাদর্শ নিয়ে বাংলায় এত
                সুবিন্যস্ত গ্রন্থ বিরল।
              </p>
              <p>
                <strong>প্রথম পর্বে</strong> রয়েছে: নজদের পরিচয় ও সংক্ষিপ্ত
                ইতিহাস, মুহাম্মাদ ইবনু আব্দিল ওয়াহহাবের জন্ম থেকে সৌদি আরব
                প্রতিষ্ঠার ইতিহাস এবং ফিলিস্তিন সমস্যায় ওয়াহাবিদের ভূমিকার
                সংক্ষিপ্ত বিবরণ।
              </p>
              <p>
                <strong>দ্বিতীয় পর্বে</strong> রয়েছে: ওয়াহাবী মতাদর্শ ও আহলে
                সুন্নাত ওয়াল জামাতের আলেমদের অবস্থান, এবং ওয়াহাবী মতাদর্শ
                সম্পর্কে আকাবিরে দেওবন্দের প্রকৃত অবস্থান।
              </p>
            </div>
            <ul className="mt-6 space-y-2">
              {[
                "প্রতিটি তথ্যের পক্ষে বলিষ্ঠ শরয়ী দালায়েল",
                "তদানীন্তন উলামায়ে কিরামের বাস্তব ইতিহাস ও বক্তব্য",
                "৮৫ জন বরেণ্য ইমাম ও মনীষীর মতামতের বিশাল সংকলন",
                "আকাবিরে দেওবন্দের প্রকৃত অবস্থান ও বিশ্লেষণ",
              ].map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-800 font-medium p-3 bg-white rounded-xl shadow-sm border border-gray-50"
                >
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <MdCheckCircle className="text-primary text-lg flex-shrink-0" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              পাঠকদের কথা
            </h3>
            {BOOK_DETAILS.testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <FaQuoteLeft className="text-gray-300 text-3xl mb-3" />
                <p className="text-gray-700 text-base font-medium leading-relaxed mb-4 italic">
                  &quot;{t.text}&quot;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900 text-sm">
                      {t.name}
                    </div>
                    <div className="text-gray-500 text-xs">{t.location}</div>
                  </div>
                  <div className="flex">
                    {[...Array(t.rating)].map((_, j) => (
                      <MdStar key={j} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── ORDER SECTION ───── */}
      <section
        ref={orderFormRef}
        id="order-section"
        className="bg-slate-50 py-10 relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-8">
            <a
              href={config.wahabider_itihas_preview_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-2xl border-2 border-primary font-bold shadow-sm hover:shadow-md hover:bg-primary/5 transition-all text-lg lg:text-xl transform active:scale-[0.98]"
            >
              <MdMenuBook className="text-2xl lg:text-3xl" />
              বইটির কিছু অংশ পড়ে দেখুন
            </a>
          </div>

          <div className="bg-primary text-white px-6 py-8 rounded-2xl text-center mb-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />

            <h2 className="text-3xl lg:text-4xl font-black mb-3 relative z-10">
              অর্ডার করতে ফর্মটি পূরণ করুন
            </h2>
            <p className="text-white/90 text-lg font-medium relative z-10">
              কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই! বই হাতে পেয়ে টাকা পরিশোধ
              করবেন।
            </p>
          </div>

          {/* ── Inline Variation/Product Picker (shown inside the order section) ── */}
          {product?.type !== "simple" && attributeKeys.length > 0 && (
            <div className="bg-white rounded-xl p-5 mb-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-base text-gray-800 mb-4">
                ভেরিয়েশন বেছে নিন ও যোগ করুন:
              </h3>

              <div
                className={`flex ${product?.type === "simple" ? "flex-col sm:flex-row items-center sm:items-end gap-6" : "flex-col sm:flex-row gap-6"}`}
              >
                {/* Left side: Image */}
                <div
                  className={`flex-shrink-0 mx-auto sm:mx-0 ${product?.type === "simple" ? "w-32 sm:w-40" : "w-24 sm:w-32"}`}
                >
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 drop-shadow-sm">
                    <Image
                      src={
                        product?.type === "simple"
                          ? thumbnailSrc || "/placeholder.jpg"
                          : selectedVariation?.image?.src?.replace(
                              /\\/g,
                              "/"
                            ) ||
                            thumbnailSrc ||
                            "/placeholder.jpg"
                      }
                      alt={product?.title || "Product"}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Right side: Selectors */}
                <div
                  className={`flex-1 flex flex-col justify-center ${product?.type === "simple" ? "w-full sm:w-auto" : ""}`}
                >
                  {/* Attribute selectors (Only for Variable Products) */}
                  {product?.type !== "simple" && (
                    <div className="space-y-3 mb-5">
                      <h1 className="text-xl font-bold">{product?.title}</h1>
                      {attributeKeys.map((key) => (
                        <div
                          key={key}
                          className="flex flex-col sm:flex-row sm:items-center gap-2"
                        >
                          <p className="font-semibold text-gray-700 min-w-[60px] text-sm capitalize">
                            {key}:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {getUniqueAttributeValues(key).map((val) => (
                              <button
                                key={val}
                                onClick={() => handleAttributeSelect(key, val)}
                                className={`px-3 py-1.5 rounded-lg border text-sm font-bold transition-all ${
                                  selectedAttributes[key] === val
                                    ? "border-primary bg-primary text-white shadow-sm"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-primary/50"
                                }`}
                              >
                                {val}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quantity + Add button row */}
                  <div
                    className={`flex flex-wrap items-center gap-3 ${product?.type === "simple" ? "justify-center sm:justify-start mt-4 sm:mt-6" : ""}`}
                  >
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-4 py-2 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <FiMinus className="text-gray-700 text-base" />
                      </button>
                      <span className="w-12 text-center text-sm font-bold text-gray-800 border-x border-gray-200 py-2 leading-none">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-4 py-2 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <FiPlus className="text-gray-700 text-base" />
                      </button>
                    </div>

                    <button
                      onClick={
                        product?.type === "simple"
                          ? handleOrderNow
                          : handleAddAnotherVariation
                      }
                      className="flex-1 sm:flex-none px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                    >
                      {product?.type === "simple" ? (
                        <>অর্ডারে যোগ করুন</>
                      ) : (
                        <>
                          <FiPlus className="text-base" />
                          অর্ডারে যোগ করুন
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Cart Items Summary (Variable Products Only) ── */}
          {cartItems.length > 0 && product?.type !== "simple" && (
            <div className="bg-white rounded-xl p-5 mb-8 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg border-b pb-2">
                নির্বাচিত আইটেমসমূহ:
              </h3>
              {cartItems.map((item, idx) => {
                const itemThumb =
                  item.variation?.image?.src?.replace(/\\/g, "/") ||
                  thumbnailSrc;
                const itemSalePrice =
                  item.variation?.price?.salePrice ??
                  item.variation?.price?.regularPrice ??
                  product?.price?.salePrice ??
                  0;

                return (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left border-b last:border-0 pb-4 last:pb-0"
                  >
                    <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 mx-auto sm:mx-0">
                      <Image
                        src={itemThumb ?? "/placeholder.jpg"}
                        alt={BOOK_DETAILS.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <p className="text-slate-900 font-bold text-base mb-1">
                          {product?.title || BOOK_DETAILS.title}
                        </p>
                        {item.variation && (
                          <p className="text-slate-500 text-xs font-medium mb-2">
                            {Object.entries(item.variation.attributes)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(", ")}
                          </p>
                        )}

                        <div className="flex items-center gap-3 mt-1 justify-center sm:justify-start">
                          <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-1">
                            <button
                              onClick={() => {
                                updateItemQuantity(item.variation?._id, -1);
                              }}
                              className="p-1 hover:bg-white hover:text-primary rounded-md transition-all text-gray-500"
                            >
                              <FiMinus className="text-xs" />
                            </button>
                            <span className="w-7 text-center font-bold text-slate-900 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                updateItemQuantity(item.variation?._id, 1);
                              }}
                              className="p-1 hover:bg-white hover:text-primary rounded-md transition-all text-gray-500"
                            >
                              <FiPlus className="text-xs" />
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              removeItem(item.variation?._id);
                            }}
                            className="text-red-500 text-xs font-bold hover:underline"
                          >
                            মুছে ফেলুন
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end justify-center">
                      <p className="text-primary font-bold">
                        &#2547;{itemSalePrice * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-2 border-t flex justify-between items-center font-black text-xl text-primary">
                <span>মোট মূল্য:</span>
                <span>
                  &#2547;
                  {cartItems.reduce((acc, item) => {
                    const price =
                      item.variation?.price?.salePrice ??
                      item.variation?.price?.regularPrice ??
                      product?.price?.salePrice ??
                      0;
                    return acc + price * item.quantity;
                  }, 0)}
                </span>
              </div>
            </div>
          )}

          {/* ── Simple Product Quantity Selector ── */}
          {product?.type === "simple" && (
            <div className="bg-white rounded-xl p-5 mb-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
                  <Image
                    src={thumbnailSrc ?? "/placeholder.jpg"}
                    alt={product?.title || BOOK_DETAILS.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col h-full justify-center">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {product?.title || BOOK_DETAILS.title}
                  </h3>
                  <div className="text-primary font-black text-xl">
                    &#2547;{salePrice}
                  </div>
                  {regularPrice > salePrice && (
                    <div className="text-sm text-gray-400 line-through">
                      &#2547;{regularPrice}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 bg-slate-50 p-4 rounded-xl border border-slate-100 w-full sm:w-auto self-center">
                <p className="text-xs font-bold text-slate-500 mb-2 text-center sm:text-left">
                  পরিমাণ:
                </p>
                <div className="flex items-center justify-center border-2 border-primary/20 rounded-lg overflow-hidden bg-white shadow-inner max-w-[140px] mx-auto sm:mx-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 hover:bg-primary/5 hover:text-primary transition-colors text-gray-500"
                  >
                    <FiMinus className="font-bold" />
                  </button>
                  <span className="flex-1 text-center font-black text-lg text-slate-900 py-1.5 leading-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 hover:bg-primary/5 hover:text-primary transition-colors text-gray-500"
                  >
                    <FiPlus className="font-bold" />
                  </button>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 text-center sm:text-left text-sm font-semibold">
                  <span className="text-gray-600">মোট মূল্য: </span>
                  <span className="text-primary font-black text-lg">
                    &#2547;{salePrice * quantity}
                  </span>
                </div>
              </div>
            </div>
          )}

          <SalesOrderForm
            shippingCharges={shippingCharges}
            paymentMethods={paymentMethods}
            productTitle={BOOK_DETAILS.title}
            cartItems={cartItems}
            fallbackPrice={salePrice}
          />

          {/* Assurance */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: <FaClock className="text-primary" />,
                text: "অতি দ্রুত কনফার্মেশন",
              },
              {
                icon: <FaMoneyBillWave className="text-primary" />,
                text: "১০০% ক্যাশ অন ডেলিভারি",
              },
              {
                icon: <FaTruck className="text-primary" />,
                text: "সারাদেশে হোম ডেলিভারি",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 text-center border border-slate-100 shadow-sm"
              >
                <div className="text-xl bg-primary/5 p-2 rounded-full mb-1">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-slate-700">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── STICKY MOBILE ORDER BUTTON ───── */}
      {!isFormVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-4 bg-white border-t border-gray-200 shadow-lg">
          <button
            onClick={handleOrderNow}
            className="w-full py-3 bg-primary text-white text-lg font-bold rounded-lg flex items-center justify-center gap-2"
          >
            <MdShoppingBag className="text-xl" /> মাত্র &#2547;{salePrice} —
            অর্ডার করুন
          </button>
        </div>
      )}
    </div>
  );
};

export default SalesPageClient;
