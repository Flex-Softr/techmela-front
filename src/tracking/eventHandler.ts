import config from "@/config/config";
import { CustomData, MetaCAPIEventPayload, UserData } from "./capi/capi.types";
import {
  cleanObj,
  getFbc,
  getFbp,
  getIP,
  getVisitorId,
  hashUserData,
  normalizeAlpha,
  normalizeAlphaNumeric,
  normalizeDOB,
  normalizeEmail,
  normalizeGender,
  normalizePhone,
  resolveEventId,
  splitFullName,
} from "./event.helpers";
import { EventParameter } from "./event.types";
import { buildGTMEventPayload } from "./gtm/gtm.builder";
import { GTMEventPayload } from "./gtm/gtm.types";
import { sendGTMEvent } from "@next/third-parties/google";

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

const eventHandler = async (eventData: EventParameter) => {
  if (typeof window === "undefined") return;

  const event_name = eventData.event_name;
  const event_id = resolveEventId(event_name, eventData);
  const event_source_url = window.location.href;
  const client_user_agent = navigator.userAgent;
  const client_ip_address = await getIP();
  const isCommerceEvent = [
    "view_content",
    "add_to_cart",
    "add_to_wishlist",
    "initiate_checkout",
    "add_payment_info",
    "purchase",
    "refund",
  ].includes(event_name);

  if (isCommerceEvent) {
    eventData.currency = eventData.currency || "BDT";
    eventData.content_type = eventData.content_type || "product";
  }
  eventData.country = eventData.country || "Bangladesh";
  //Todo enable later
  delete eventData.zp;

  // 0. Pre-normalize sensitive user data for consistency between GTM (unhashed) and CAPI (hashed)
  if (eventData.em) eventData.em = normalizeEmail(eventData.em);
  if (eventData.ph) eventData.ph = normalizePhone(eventData.ph);
  if (eventData.db) eventData.db = normalizeDOB(eventData.db);
  if (eventData.ge) eventData.ge = normalizeGender(eventData.ge);
  if (eventData.ct) eventData.ct = normalizeAlpha(eventData.ct);
  if (eventData.st) eventData.st = normalizeAlpha(eventData.st);
  if (eventData.zp) eventData.zp = normalizeAlphaNumeric(eventData.zp);
  if (eventData.country)
    eventData.country = normalizeAlphaNumeric(eventData.country);

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
  await hashAndAssign("ph", eventData.ph);

  // Names — three possible input patterns:
  // 1. Caller passes fn/ln directly
  // 2. Caller passes full name in fn field (with spaces)
  // 3. Caller passes fullName (most common — both hooks use this)
  let fn = eventData.fn;
  let ln = eventData.ln;

  // If fn has spaces, a full name was put in the fn field — split it first
  if (fn && fn.trim().includes(" ")) {
    const split = splitFullName(fn);
    fn = split.fn;
    ln = ln || split.ln;
  }

  // Fallback: derive fn/ln from fullName if not already set
  if (!fn && !ln && eventData.fullName) {
    const split = splitFullName(eventData.fullName);
    fn = split.fn;
    ln = split.ln;
  }

  // Normalize AFTER splitting (normalizeAlpha strips spaces)
  if (fn) fn = normalizeAlpha(fn);
  if (ln) ln = normalizeAlpha(ln);

  await hashAndAssign("fn", fn);
  await hashAndAssign("ln", ln);

  // Demographic (Tiebreakers for shared IPs)
  await hashAndAssign("db", eventData.db);
  await hashAndAssign("ge", eventData.ge);

  // Location
  await hashAndAssign("ct", eventData.ct);
  await hashAndAssign("st", eventData.st);
  await hashAndAssign("zp", eventData.zp);
  await hashAndAssign("country", eventData.country);

  // Identifiers
  const externalId = eventData.external_id || getVisitorId();
  await hashAndAssign("external_id", externalId);

  // Facebook IDs
  const fbp = getFbp();
  const fbc = eventData.fbc || getFbc();
  processedUserData.fbp = fbp;
  processedUserData.fbc = fbc;
  processedUserData.fb_login_id = eventData.fb_login_id;

  // Update raw eventData with resolved values for GTM consistency
  eventData.external_id = externalId;
  eventData.fbp = fbp;
  eventData.fbc = fbc;
  eventData.fn = fn;
  eventData.ln = ln;

  // Identifiers

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
      const value = (eventData as Record<string, unknown>)[key];

      // Only include these fields if they have a non-zero value
      const fieldsToSkipIfZero = ["shipping", "tax", "discount_value"];
      if (fieldsToSkipIfZero.includes(key) && value === 0) {
        return;
      }

      custom_data[key] = value;
    }
  });

  // Auto-calculate num_items and content_ids if not provided but contents exist
  const contents = eventData.contents;
  if (contents && contents.length > 0) {
    if (!custom_data.num_items) {
      custom_data.num_items = contents.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );
    }
    if (!custom_data.content_ids) {
      custom_data.content_ids = contents.map((item) => item.id || "");
    }
    if (!custom_data.content_name) {
      custom_data.content_name = contents
        .map((item) => item.title || item.name)
        .filter(Boolean)
        .join(", ");
    }
  }

  // 3. Construct the strictly typed GTMEventPayload for both GTM and CAPI
  const finalUserData = cleanObj({ ...processedUserData });
  const event_time = Math.floor(Date.now() / 1000);

  const payload: MetaCAPIEventPayload = cleanObj({
    event_name,
    event_time,
    event_id,
    user_data: finalUserData,
    custom_data:
      Object.keys(custom_data).length > 0
        ? (cleanObj(custom_data) as CustomData)
        : undefined,
    action_source: "website",
    event_source_url,
    referrer_url: eventData.referrer_url || document.referrer || "",
  });

  // 4. Construct GTM-specific payload (GA4 Ecommerce Format using UNHASHED data)
  const gtmPayload: GTMEventPayload = buildGTMEventPayload(payload, eventData);

  // 5. Send to Google Tag Manager
  sendGTMEvent(gtmPayload);

  // 5. Send to the server-side tracking endpoint for Meta CAPI
  try {
    await fetch(`${config.tracking_api_url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("CAPI error", error);
  }
};

export default eventHandler;
