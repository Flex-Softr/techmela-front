/**
 * Unified entry point for Google Tag Manager (GTM) and Meta Conversions API (CAPI) utilities.
 * Provides a single interface for consistent tracking across the application.
 *
 * Usage:
 * import { gtmEventHandler } from "@/utilities/GTM";
 * gtmEventHandler({ event_name:: "view_item", ... });
 */

export { default as gtmEventHandler } from "./gtm.handler";
export * from "./gtm.helpers";
export * from "./gtm.types";
