const config = {
  api_base_url: process.env.NEXT_PUBLIC_API_BASE_URL,
  facebook_pixel: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  gtm_id: process.env.GTM_ID,
  revalidate_secret: process.env.REVALIDATE_SECRET,
  tracking_base_url: process.env.NEXT_PUBLIC_TRACKING_BASE_URL,
  per_item_shipping_cost: 0,
  wahabider_itihas_slug: process.env.NEXT_PUBLIC_WAHABIDER_ITIHAS_SLUG,
  wahabider_itihas_preview_link:
    process.env.NEXT_PUBLIC_WAHABIDER_ITIHAS_PREVIEW_LINK,
  milad_kiyam_slug: process.env.NEXT_PUBLIC_MILAD_KIYAM_SLUG,
  milad_kiyam_preview_link: process.env.NEXT_PUBLIC_MILAD_KIYAM_PREVIEW_LINK,
};

export default config;
