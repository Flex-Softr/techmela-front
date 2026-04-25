"use client";

import eventHandler from "@/tracking/eventHandler";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TSingleProduct } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import { useEffect, useRef, useState } from "react";

import SalesHeader from "../../../_components/SalesHeader";
import SalesOrderForm from "../../../_components/SalesOrderForm";
// New Redesign Components
import BookHighlights from "./BookHighlights";
import FAQSection from "./FAQSection";
// import FearResponsibility from "./FearResponsibility";
import FinalPsychologicalClose from "./FinalPsychologicalClose";
import PricingSection from "./PricingSection";
import PsychologicalDisruption from "./PsychologicalDisruption";
import PsychologicalHero from "./PsychologicalHero";
import SolutionAuthority from "./SolutionAuthority";
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
  const price = product?.price?.salePrice || product?.price?.regularPrice || 0;

  const hasTrackedViewRef = useRef(false);
  useEffect(() => {
    if (product && !hasTrackedViewRef.current) {
      hasTrackedViewRef.current = true;
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

      <PsychologicalDisruption
        onOrderClick={handleOrderNow}
        previewLink={product?.previewLink}
        bookTitle={product?.title || bookDetails.title}
      />

      <SolutionAuthority
        thumbnailSrc={thumbnailSrc}
        onOrderClick={handleOrderNow}
        previewLink={product?.previewLink}
        bookTitle={product?.title || bookDetails.title}
      />

      {/* <FearResponsibility
        onOrderClick={handleOrderNow}
        
      /> */}

      <BookHighlights
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        highlights={bookDetails.highlights as any}
        onOrderClick={handleOrderNow}
        previewLink={product?.previewLink}
        bookTitle={product?.title || bookDetails.title}
      />

      <Testimonials
        onOrderClick={handleOrderNow}
        previewLink={product?.previewLink}
        bookTitle={product?.title || bookDetails.title}
      />

      <PricingSection
        regularPrice={regularPrice}
        salePrice={salePrice}
        onOrderClick={handleOrderNow}
        previewLink={product?.previewLink}
        bookTitle={product?.title || bookDetails.title}
      />

      <FAQSection
        onOrderClick={handleOrderNow}
        previewLink={product?.previewLink}
        bookTitle={product?.title || bookDetails.title}
      />

      {/* ───── ORDER FORM SECTION ───── */}
      <section className="bg-gray-50 py-8" ref={orderFormRef}>
        <div className="max-w-screen-2xl mx-auto px-4">
          <SalesOrderForm
            lpNo="LP-MTP-01"
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
