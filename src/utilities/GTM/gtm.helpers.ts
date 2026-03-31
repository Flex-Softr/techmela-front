/**
 * Normalizes a value by trimming and converting to lowercase before hashing (Meta requirement).
 * @param value The string value to normalize
 * @returns Normalized string
 */
const normalize = (value: string): string => {
  return value.trim().toLowerCase();
};

/**
 * SHA-256 hashes a string value using the browser's crypto API.
 * @param value The string to hash
 * @returns A promise that resolves to the hex-encoded SHA-256 hash
 */
export const hashUserData = async (
  value?: string | null
): Promise<string | undefined> => {
  if (!value) return undefined;

  const normalized = normalize(value);
  const msgBuffer = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashed = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hashed;
};

/**
 * Retrieves a cookie value by name.
 * @param name The name of the cookie
 * @returns The cookie value or undefined if not found
 */
export const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : undefined;
};

/**
 * Extracts the Facebook Click ID (fbclid) from the URL, formats it, and persists it in a cookie.
 * This ensures the click ID is available for attribution even if the user navigates away or returns later.
 * @returns The formatted FBC string or the existing cookie value
 */
export const getFbc = (): string | undefined => {
  if (typeof window === "undefined") return undefined;

  // 1. Check URL for new click ID
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");

  if (fbclid) {
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    setCookie("_fbc", fbc, 90); // Persist for 90 days
    return fbc;
  }

  // 2. Fallback to existing cookie
  return getCookie("_fbc");
};

/**
 * Normalizes a phone number by removing non-digits and ensuring it starts with a country code.
 */
export const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? "88" + digits : digits;
};

/**
 * Normalizes a city name (lowercase, no spaces, no punctuation).
 */
export const normalizeCity = (city: string): string => {
  return city.toLowerCase().replace(/[^a-z]/g, "");
};

/**
 * Normalizes a state (lowercase, trim).
 */
export const normalizeState = (state: string): string => {
  return state.trim().toLowerCase();
};

/**
 * Normalizes a zip code (lowercase, no spaces, no dashes).
 */
export const normalizeZip = (zip: string): string => {
  return zip.toLowerCase().replace(/[^a-z0-9]/g, "");
};

/**
 * Normalizes a country code (lowercase, trim).
 */
export const normalizeCountry = (country: string): string => {
  return country.trim().toLowerCase();
};

/**
 * Normalizes a date of birth to YYYYMMDD format (Meta requirement).
 */
export const normalizeDOB = (dob: string): string => {
  return dob.replace(/[^0-9]/g, ""); // Keep only digits
};

/**
 * Normalizes gender to 'f' or 'm' (Meta requirement).
 */
export const normalizeGender = (ge: string): string => {
  const normalized = ge.trim().toLowerCase();
  if (normalized.startsWith("m")) return "m";
  if (normalized.startsWith("f")) return "f";
  return normalized;
};

/**
 * Generates a unique event ID for GTM/Meta tracking.
 */
export const generateEventId = (prefix: string): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
};

/**
 * Sets a cookie with a given name, value, and expiration in days.
 */
export const setCookie = (name: string, value: string, days: number = 730) => {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
};

/**
 * Retrieves or generates a persistent visitor ID for anonymous tracking.
 * @returns A unique visitor ID string
 */
export const getVisitorId = (): string => {
  const existingId = getCookie("_visitor_id");
  if (existingId) return existingId;

  const newId = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  setCookie("_visitor_id", newId);
  return newId;
};

/**
 * Retrieves the user's public IP address for Meta CAPI tracking.
 * This is crucial for a 10/10 Match Quality score.
 * Results are cached in memory for the session to avoid multiple API calls.
 */
let cachedIp: string | undefined;
export const getIP = async (): Promise<string | undefined> => {
  if (cachedIp) return cachedIp;
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    cachedIp = data?.ip;
    return cachedIp;
  } catch (_error) {
    return undefined;
  }
};
