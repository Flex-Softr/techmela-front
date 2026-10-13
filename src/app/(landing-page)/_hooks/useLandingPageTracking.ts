"use client";

import { Content, EventParameter } from "@/tracking/event.types";
import eventHandler from "@/tracking/eventHandler";
import { useCallback, useEffect, useRef } from "react";

/** Product info a landing page needs to build its tracking payloads. */
export type TLandingTrackingProduct = {
  id: string; // Must be the real product _id (same ID the main site / Meta catalog uses)
  name: string;
  unitPrice: number; // Current selling (sale) price of 1 unit
  brand?: string;
  category?: string;
  variant?: string; // e.g. "Color: Black" for variable products
};

export type TCheckoutCustomer = {
  fullName: string;
  phoneNumber: string;
  email?: string;
};

/**
 * Funnel tracking for one-page sales landing pages.
 *
 * Mirrors the main website funnel so the SAME GTM triggers/tags fire
 * (no GTM change needed):
 *
 *  page_view          → fired globally by <PageTracking /> in the root layout
 *  view_content       → once, when the landing page mounts (= product page view)
 *  add_to_cart        → once, on the first "অর্ডার করুন" CTA click
 *                       (or automatically right before initiate_checkout if the
 *                       visitor scrolled straight to the form without clicking a CTA)
 *  initiate_checkout  → once, when the order form has a name + valid phone
 *  purchase           → fired by useSalesOrderSubmit after the order API succeeds
 *
 * Every event fires at most once per page visit, so repeated CTA clicks or
 * form edits never inflate the numbers.
 */
const useLandingPageTracking = (
  product: TLandingTrackingProduct,
  quantity: number
) => {
  const { id, name, unitPrice, brand, category, variant } = product;

  // Latest quantity without re-creating the callbacks on every +/- click
  const quantityRef = useRef(quantity);
  useEffect(() => {
    quantityRef.current = quantity;
  }, [quantity]);

  const firedRef = useRef({
    viewContent: false,
    addToCart: false,
    initiateCheckout: false,
  });

  const buildProductPayload = useCallback(
    (qty: number): Omit<EventParameter, "event_name"> => {
      const content: Content = {
        id,
        quantity: qty,
        item_price: unitPrice,
        name,
        brand,
        category,
        variant,
      };

      return {
        content_name: name,
        content_ids: [id],
        content_type: "product",
        content_category: category,
        contents: [content],
        value: unitPrice * qty,
      };
    },
    [id, name, unitPrice, brand, category, variant]
  );

  // view_content — once per page visit
  useEffect(() => {
    if (firedRef.current.viewContent) return;
    firedRef.current.viewContent = true;

    eventHandler({
      event_name: "view_content",
      ...buildProductPayload(1),
    });
  }, [buildProductPayload]);

  const trackAddToCart = useCallback(async () => {
    if (firedRef.current.addToCart) return;
    firedRef.current.addToCart = true;

    await eventHandler({
      event_name: "add_to_cart",
      ...buildProductPayload(quantityRef.current),
    });
  }, [buildProductPayload]);

  const trackInitiateCheckout = useCallback(
    async (customer: TCheckoutCustomer) => {
      if (firedRef.current.initiateCheckout) return;
      firedRef.current.initiateCheckout = true;

      // Keep the funnel order intact: add_to_cart must reach the dataLayer first
      await trackAddToCart();

      await eventHandler({
        event_name: "initiate_checkout",
        fn: customer.fullName,
        ph: customer.phoneNumber,
        em: customer.email || undefined,
        ...buildProductPayload(quantityRef.current),
      });
    },
    [buildProductPayload, trackAddToCart]
  );

  return { trackAddToCart, trackInitiateCheckout };
};

export default useLandingPageTracking;
