// import config from "@/config/config";
// import { sendGTMEvent } from "@next/third-parties/google";
import {
  generateEventId,
  getCookie,
  getFbc,
  getIP,
  getVisitorId,
  hashUserData,
  normalizeCity,
  normalizeCountry,
  normalizeDOB,
  normalizeGender,
  normalizePhone,
  normalizeState,
  normalizeZip,
} from "./gtm.helpers";
import {
  CustomData,
  GTMEventPayload,
  TGtmEventParameter,
  UserData,
} from "./gtm.types";

/**
 * The main handler for processing and dispatching GTM and Meta Conversions API (CAPI) events.
 * It hashes sensitive user data, attaches tracking IDs (fbp, fbc), and sends data to both
 * Google Tag Manager (client-side) and a custom tracking endpoint (server-side).
 *
 * Implements Meta's 2026 Advanced Matching requirements for maximum Match Quality (10/10).
 *
 * @param eventData - The raw event parameters from the application
 */
// eslint-disable-next-line no-unused-vars
type Normalizer = (v: string) => string;

const gtmEventHandler = async (eventData: TGtmEventParameter) => {
  if (typeof window === "undefined") return;

  const event_name = eventData.event_name;
  const event_id = eventData.event_id || generateEventId(event_name);
  const event_source_url = window.location.href;
  const client_user_agent = navigator.userAgent;
  const client_ip_address = await getIP();
  eventData.currency = eventData.currency || "BDT";
  eventData.content_type = eventData.content_type || "product";

  // 1. Process and Hash User Data for Meta Match Quality
  const processedUserData: UserData = {
    client_ip_address,
    client_user_agent,
  };

  const hashAndAssign = async (
    key: keyof UserData,
    value: string | undefined,
    normalizer?: Normalizer
  ) => {
    if (!value) return;
    const normalized = normalizer ? normalizer(value) : value;
    const hashed = await hashUserData(normalized);
    if (hashed) {
      (processedUserData[key] as string[]) = [hashed];
    }
  };

  // Email & Phone
  await hashAndAssign("em", eventData.em);
  await hashAndAssign("ph", eventData.ph, normalizePhone);

  // Names
  await hashAndAssign("fn", eventData.fn);
  await hashAndAssign("ln", eventData.ln);

  // Demographic (Tiebreakers for shared IPs)
  if (eventData.db) await hashAndAssign("db", eventData.db, normalizeDOB);
  if (eventData.ge) await hashAndAssign("ge", eventData.ge, normalizeGender);

  // Location
  await hashAndAssign("ct", eventData.ct, normalizeCity);
  await hashAndAssign("st", eventData.st, normalizeState);
  await hashAndAssign("zp", eventData.zp, normalizeZip);
  await hashAndAssign("country", eventData.country, normalizeCountry);

  // Identifiers
  const externalId = eventData.external_id || getVisitorId();
  await hashAndAssign("external_id", externalId);

  // Facebook IDs
  processedUserData.fbp = getCookie("_fbp");
  processedUserData.fbc = eventData.fbc || getFbc();

  // Client context
  processedUserData.client_user_agent = client_user_agent;

  // 2. Extract CustomData for Meta CAPI
  const customDataKeys = [
    "value",
    "currency",
    "content_ids",
    "contents",
    "content_type",
    "content_name",
    "content_category",
    "order_id",
    "num_items",
    "predicted_ltv",
    "shipping",
    "tax",
    "discount_value",
    "coupon",
    "status",
    "search_string",
    "payment_method",
    "store_id",
    "subscription_id",
    "customer_segmentation",
  ];

  const custom_data: Record<string, unknown> = {};
  customDataKeys.forEach((key) => {
    if (key in eventData) {
      custom_data[key] = (eventData as Record<string, unknown>)[key];
    }
  });

  // 3. Construct the strictly typed GTMEventPayload for both GTM and CAPI
  const finalUserData = { ...processedUserData };
  const event_time = Math.floor(Date.now() / 1000);

  const payload: GTMEventPayload = {
    event_name,
    event_time,
    event_id,
    user_data: finalUserData,
    custom_data:
      Object.keys(custom_data).length > 0
        ? (custom_data as CustomData)
        : undefined,
    action_source: "website",
    event_source_url,
    referrer_url: eventData.referrer_url || document.referrer || "",
  };
  // eslint-disable-next-line no-console
  console.log("gtm payload", payload);
  // 4. Send to Google Tag Manager (Client-side)
  // sendGTMEvent(payload);

  // 5. Send to the server-side tracking endpoint for Meta CAPI
  try {
    // fetch(`${config.tracking_base_url}/track`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // }).catch(() => {
    //   // Fail silently to avoid interrupting user experience
    // });
  } catch (error) {
    // Fail silently
  }
};

export default gtmEventHandler;
