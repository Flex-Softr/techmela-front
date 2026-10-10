import config from "@/config/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageSrc(src: string | undefined | null): string {
  // Return placeholder if src is missing
  if (!src) return "/placeholder.webp";

  // Trim and replace backslashes
  let cleanSrc = src.trim().replace(/\\/g, "/");

  // Check for string "null" or "undefined"
  if (cleanSrc === "null" || cleanSrc === "undefined" || !cleanSrc) {
    return "/placeholder.webp";
  }

  // Base URL normalization: remove trailing slash, and remove any trailing /server-api or /server-api/v1
  const rawBaseUrl = (config.api_base_url || "").trim().replace(/\/+$/, "");
  const origin = rawBaseUrl.replace(/\/server-api(\/v1)?$/i, "");

  // If already absolute HTTP/HTTPS URL
  if (cleanSrc.startsWith("http://") || cleanSrc.startsWith("https://")) {
    // If URL points to localhost in production, replace with production origin
    if (config.env === "production" && cleanSrc.includes("localhost:5000") && origin) {
      cleanSrc = cleanSrc.replace(/http:\/\/localhost:5000/g, origin);
    }
    // Fix broken absolute URLs missing uploads/public: e.g. /server-api/general/...
    if (
      cleanSrc.includes("/server-api/") &&
      !cleanSrc.includes("/server-api/uploads/") &&
      !cleanSrc.includes("/server-api/v1/")
    ) {
      cleanSrc = cleanSrc.replace(
        /\/server-api\/(?!uploads\/|v1\/)/,
        "/server-api/uploads/public/"
      );
    }
    // Fix double /server-api/server-api/
    cleanSrc = cleanSrc.replace(/\/server-api\/server-api\//g, "/server-api/");
    return cleanSrc;
  }

  // If local Next.js asset from /public directory (e.g., /placeholder.webp, /images/..., /logo/...)
  if (
    cleanSrc.startsWith("/images/") ||
    cleanSrc.startsWith("/logo/") ||
    cleanSrc.startsWith("/placeholder") ||
    cleanSrc.startsWith("/icon") ||
    cleanSrc.startsWith("/favicon")
  ) {
    return cleanSrc;
  }

  if (
    cleanSrc.startsWith("images/") ||
    cleanSrc.startsWith("logo/") ||
    cleanSrc.startsWith("icon.") ||
    cleanSrc.startsWith("favicon.")
  ) {
    return `/${cleanSrc}`;
  }

  if (cleanSrc === "placeholder.webp" || cleanSrc === "placeholder.png") {
    return `/${cleanSrc}`;
  }

  // Strip leading slash if present
  if (cleanSrc.startsWith("/")) {
    cleanSrc = cleanSrc.substring(1);
  }

  // If cleanSrc starts with server-api/, strip it so we can re-build cleanly
  if (cleanSrc.startsWith("server-api/")) {
    cleanSrc = cleanSrc.replace(/^server-api\//, "");
  }

  // If cleanSrc starts with uploads/public or uploads/...
  if (cleanSrc.startsWith("uploads/")) {
    return `${origin}/server-api/${cleanSrc}`;
  }

  // For backend relative storage keys (e.g. "general/...", "products/...")
  return `${origin}/server-api/uploads/public/${cleanSrc}`;
}
