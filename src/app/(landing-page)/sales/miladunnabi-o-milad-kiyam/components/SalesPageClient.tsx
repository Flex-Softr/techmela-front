"use client";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TSingleProduct } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useEffect, useRef, useState } from "react";
import Facilities from "@/components/home/facilities/Facilities";

// Import Client sub-components
import SalesHeader from "./SalesHeader";
import HeroSection from "./HeroSection";
import StickyOrderButton from "./StickyOrderButton";
import SalesOrderForm from "./SalesOrderForm";

type Props = {
  product: TSingleProduct | undefined;
  shippingCharges: TShippingCharges[];
  paymentMethods: TPaymentMethod[];
  bookDetails: {
    title: string;
    highlights: { icon: string; title: string; description: string }[];
    pages: number | string;
    scholars: number | string;
    testimonials: unknown[];
  };
  announcementBar: React.ReactNode;
  highlights: React.ReactNode;
  stats: React.ReactNode;
  testimonials: React.ReactNode;
};

const SalesPageClient = ({
  product,
  shippingCharges,
  paymentMethods,
  bookDetails,
  announcementBar,
  highlights,
  stats,
  testimonials,
}: Props) => {
  const orderFormRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [lastTrackedCart, setLastTrackedCart] = useState<string>("");

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

  const handleOrderNow = () => {
    if (!product) return;

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
    scrollToOrder();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (orderFormRef.current) observer.observe(orderFormRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToOrder = () => {
    orderFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const regularPrice = product?.price?.regularPrice ?? 0;
  const salePrice = product?.price?.salePrice ?? regularPrice;
  const discount =
    regularPrice > salePrice
      ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
      : 0;

  const thumbnailSrc = product?.thumbnail?.src?.replace(/\\/g, "/");

  const cartItems = product
    ? [
        {
          productId: product._id,
          variation: null,
          quantity: quantity,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-white font-bengali">
      <SalesHeader onOrderClick={handleOrderNow} />

      {announcementBar}

      <HeroSection
        productTitle={product?.title || bookDetails.title}
        author={
          product?.author ||
          (typeof bookDetails.scholars === "string"
            ? bookDetails.scholars
            : "সিদ্দীকিয়া প্রকাশনী")
        }
        shortDescription={product?.shortDescription}
        thumbnailSrc={thumbnailSrc}
        regularPrice={regularPrice}
        salePrice={salePrice}
        discount={discount}
        quantity={quantity}
        setQuantity={setQuantity}
        onOrderNow={handleOrderNow}
        stockStatus={product?.inventory?.stockStatus}
      />

      <Facilities />

      {highlights}

      {stats}

      {testimonials}

      {/* ───── ORDER FORM SECTION ───── */}
      <section className="bg-gray-50 py-20" ref={orderFormRef}>
        <div className="max-w-7xl mx-auto px-4">
          <SalesOrderForm
            shippingCharges={shippingCharges}
            paymentMethods={paymentMethods}
            productTitle={product?.title || bookDetails.title}
            cartItems={cartItems}
            thumbnailSrc={thumbnailSrc}
            quantity={quantity}
            setQuantity={setQuantity}
            bookDetails={bookDetails}
            product={product ?? null}
            salePrice={salePrice}
          />
        </div>
      </section>

      <StickyOrderButton
        isVisible={isFormVisible}
        salePrice={salePrice}
        quantity={quantity}
        setQuantity={setQuantity}
        scrollToOrder={scrollToOrder}
      />
    </div>
  );
};

export default SalesPageClient;
