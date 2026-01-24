const config = {
  api_base_url: process.env.NEXT_PUBLIC_API_BASE_URL,
  facebook_pixel: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  gtm_id: process.env.GTM_ID,
  revalidate_secret: process.env.REVALIDATE_SECRET,
  tracking_base_url: process.env.NEXT_PUBLIC_TRACKING_BASE_URL,
  per_item_shipping_cost: 50,
};

export default config;
