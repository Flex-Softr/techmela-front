import { Content } from "../event.types";

export type GA4Address = {
  first_name?: string;
  last_name?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  country?: string;
};

export type GA4UserData = {
  email_address?: string;
  phone_number?: string;
  address?: GA4Address;
  // Advanced Matching - Identifiers (SHA256 hashed)
  external_id?: string; // Hashed internal user ID
  fb_login_id?: string; // Facebook Login ID
  fbc?: string;
  fbp?: string;
  gender?: string;
  dob?: string;
};

export type GA4Item = {
  item_id?: string;
  item_name?: string;
  price?: number;
  quantity?: number;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
};

export type DLVUserData = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postal_code?: string;
    country?: string;
  };
  external_id?: string;
  fbc?: string;
  fbp?: string;
  // Hashed array fallbacks
  em?: string[];
  ph?: string[];
  fn?: string[];
  ln?: string[];
  ct?: string[];
  st?: string[];
  zp?: string[];
  country?: string[];
};

export type DLVCustomData = {
  order_id?: string;
  value?: number;
  currency?: string;
  contents?: Content[];
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  content_category?: string;
  num_items?: number;
  shipping?: number;
  tax?: number;
  discount_value?: number;
  coupon?: string;
  search_string?: string;
  payment_method?: string;
  status?: string;
};

export type DLVEcommerce = {
  value?: number;
  currency?: string;
  transaction_id?: string;
  items?: GA4Item[];
};

export type GTMEventPayload = {
  event: string;
  // Top-level variables matching DLV - * in GTM Web Container
  event_id?: string;
  event_time?: number;
  event_source_url?: string;
  action_source?: string;
  session_id?: string;
  external_id?: string;
  custom_data?: DLVCustomData;
  ecommerce?: DLVEcommerce;
  user_data?: DLVUserData;
  // GA4 eventModel compatibility
  eventModel: {
    event_id: string;
    event_time: number;
    user_data?: GA4UserData;
    items?: GA4Item[];
    content_type?: string;
    content_ids?: string[];
    content_name?: string;
    content_category?: string;
    num_items?: number;
    value?: number;
    currency?: string;
    shipping?: number;
    tax?: number;
    discount_value?: number;
    payment_method?: string;
    transaction_id?: string;
    search_term?: string;
    coupon?: string;
    status?: string;
    order_id?: string;
    event_source_url?: string;
  };
};
