"use client";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TSingleProduct } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useEffect, useRef, useState } from "react";
import config from "@/config/config";

// Import Client sub-components
import SalesHeader from "./SalesHeader";
import SalesOrderForm from "./SalesOrderForm";

// New Redesign Components
import PsychologicalHero from "./PsychologicalHero";
import PsychologicalDisruption from "./PsychologicalDisruption";
import SolutionAuthority from "./SolutionAuthority";
import FearResponsibility from "./FearResponsibility";
import FinalPsychologicalClose from "./FinalPsychologicalClose";
import BookHighlights from "./BookHighlights";
import Testimonials from "./Testimonials";
import PricingSection from "./PricingSection";
import FAQSection from "./FAQSection";

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
};

const SalesPageClient = ({
  product,
  shippingCharges,
  paymentMethods,
  bookDetails,
  announcementBar,
}: Props) => {
  const orderFormRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);
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

  const handlePreviewClick = () => {
    if (config.mazhab_tyager_porinam_preview_link) {
      window.open(config.mazhab_tyager_porinam_preview_link, "_blank");
    }
  };

  const scrollToOrder = () => {
    orderFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const regularPrice = product?.price?.regularPrice ?? 0;
  const salePrice = product?.price?.salePrice ?? regularPrice;

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

      {/* ───── NEW PSYCHOLOGICAL FLOW ───── */}

      <PsychologicalHero
        onOrderClick={handleOrderNow}
        thumbnailSrc={thumbnailSrc}
        regularPrice={regularPrice}
        salePrice={salePrice}
        onPreviewClick={handlePreviewClick}
      />

      <PsychologicalDisruption />

      <SolutionAuthority
        thumbnailSrc={thumbnailSrc}
        onOrderClick={handleOrderNow}
        onPreviewClick={handlePreviewClick}
      />

      <FearResponsibility
        onOrderClick={handleOrderNow}
        onPreviewClick={handlePreviewClick}
      />

      <BookHighlights
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        highlights={bookDetails.highlights as any}
        onOrderClick={handleOrderNow}
        onPreviewClick={handlePreviewClick}
      />

      <Testimonials
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // testimonials={bookDetails.testimonials as any}
      // onOrderClick={handleOrderNow}
      // onPreviewClick={handlePreviewClick}
      />

      <PricingSection
        regularPrice={regularPrice}
        salePrice={salePrice}
        onOrderClick={handleOrderNow}
      />

      <FAQSection />

      {/* ───── ORDER FORM SECTION ───── */}
      <section className="bg-gray-50 py-8" ref={orderFormRef}>
        <div className="max-w-screen-2xl mx-auto px-4">
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
            regularPrice={regularPrice}
          />
        </div>
      </section>

      <FinalPsychologicalClose onOrderClick={handleOrderNow} />
    </div>
  );
};

export default SalesPageClient;
