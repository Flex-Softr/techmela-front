"use client";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TSingleProduct } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import eventHandler from "@/tracking/eventHandler";
import { useEffect, useRef, useState } from "react";

import SalesHeader from "../../../_components/SalesHeader";
import SalesOrderForm from "./SalesOrderForm";

// Redesigned Components
import BookHighlights from "./BookHighlights";
import FAQSection from "./FAQSection";
import FinalPsychologicalClose from "./FinalPsychologicalClose";
import PricingSection from "./PricingSection";
import PsychologicalDisruption from "./PsychologicalDisruption";
import PsychologicalHero from "./PsychologicalHero";
import Testimonials from "./Testimonials";

type Props = {
  product: TSingleProduct | undefined;
  shippingCharges: TShippingCharges[];
  paymentMethods: TPaymentMethod[];
  bookDetails: {
    title: string;
    highlights: { icon: string; title: string; description: string }[];
    pages: number | string;
    scholars: number | string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    testimonials: any[];
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
  const price = product?.price?.salePrice || product?.price?.regularPrice || 0;

  useEffect(() => {
    if (product) {
      eventHandler({
        event_name: "view_content",
        content_name: product.title,
        content_ids: [product._id],
        content_type: "product",
        content_category: product.category?.[0]?.name,
        contents: [
          {
            id: product._id,
            quantity: 1,
            item_price: price,
            name: product.title,
            brand: product.brand?.name,
            category: product.category?.[0]?.name,
            // item_variant:"size,color"
          },
        ],
        value: price,
      });
    }
  }, [price, product]);

  const handleOrderNow = () => {
    if (!product) return;

    const currentKey = `${product._id}-simple-${quantity}`;
    if (currentKey !== lastTrackedCart) {
      eventHandler({
        event_name: "add_to_cart",
        content_name: product.title,
        content_ids: [product._id],
        content_type: "product",
        content_category: product.category?.[0]?.name,
        contents: [
          {
            id: product._id,
            quantity,
            item_price: price,
            name: product.title,
            brand: product.brand?.name,
            category: product.category?.[0]?.name,
            // variant: product.variations?.[0]?.attributes
            //   ?.map((attr) => `${attr.name}: ${attr.value}`)
            //   .join(", "),
          },
        ],
        value: price * quantity,
      });
      setLastTrackedCart(currentKey);
    }
    scrollToOrder();
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
        previewLink={product?.previewLink}
        bookTitle={product?.title || bookDetails.title}
      />

      <PsychologicalDisruption />

      <BookHighlights
        onOrderClick={handleOrderNow}
        previewLink={product?.previewLink}
        bookTitle={product?.title || bookDetails.title}
      />

      <Testimonials />

      <PricingSection
        regularPrice={regularPrice}
        salePrice={salePrice}
        onOrderClick={handleOrderNow}
      />

      <FAQSection />

      {/* ───── ORDER FORM SECTION ───── */}
      <section className="bg-gray-50 py-6 lg:py-12" ref={orderFormRef}>
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
