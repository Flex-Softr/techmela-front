import { SITE } from "@/const/site.const";
import { getImageSrc } from "@/lib/utils";

export const SITE_URL = SITE.baseUrl;

export const stripHtml = (value = "") =>
  value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const truncateText = (value = "", max = 160) => {
  const clean = stripHtml(value);
  return clean.length > max ? `${clean.slice(0, max).trim()}...` : clean;
};

export const getRefLabel = (value: unknown) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const item = value as {
      name?: string;
      title?: string;
      question?: string;
      fullName?: string;
      email?: string;
      slug?: string;
    };
    return (
      item.name ||
      item.title ||
      item.question ||
      item.fullName ||
      item.email ||
      item.slug ||
      ""
    );
  }
  return "";
};

export const getRefSlug = (value: unknown) => {
  if (!value || typeof value !== "object") return "";
  return (value as { slug?: string }).slug || "";
};

export const getImageFromRef = (value: unknown) => {
  if (!value || typeof value !== "object") return "/placeholder.webp";
  return getImageSrc((value as { src?: string }).src);
};

export const formatDate = (value?: string) =>
  value
    ? new Intl.DateTimeFormat("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(value))
    : "";
