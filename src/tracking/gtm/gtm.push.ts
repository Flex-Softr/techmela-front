import { sendGTMEvent } from "@next/third-parties/google";
import { GTMEventPayload } from "./gtm.types";

/**
 * Nested objects that every tracking event re-sends in full.
 *
 * GTM's data model recursively MERGES each dataLayer push into the previous
 * state (arrays are merged index-by-index). Without a reset, keys from an
 * earlier event leak into later ones — e.g. `custom_data.search_string` from a
 * search showing up on add_to_cart, or a stale `items[1]` from a 2-item
 * view surviving into a 1-item purchase.
 *
 * Pushing `null` first (no `event` key, so no trigger fires) is Google's
 * recommended pattern and does not require any change inside GTM — all
 * Data Layer Variables keep reading the same paths.
 */
const RESET_PAYLOAD = {
  ecommerce: null,
  custom_data: null,
  user_data: null,
  eventModel: null,
} as const;

export const pushGTMEvent = (payload: GTMEventPayload) => {
  sendGTMEvent(RESET_PAYLOAD);
  sendGTMEvent(payload);
};
