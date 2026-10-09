const config = {
  env: process.env.NEXT_PUBLIC_NODE_ENV || "development",
  api_base_url: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  revalidate_secret: process.env.REVALIDATE_SECRET || "123456",
  tracking_api_url:
    process.env.NEXT_PUBLIC_TRACKING_API_URL ||
    "http://localhost:5001/api/v1/events",
  gtm_id: process.env.GTM_ID || "",
};

export default config;
