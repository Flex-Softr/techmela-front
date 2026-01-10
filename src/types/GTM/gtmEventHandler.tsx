export type TGtmEvents =
  | "view_content"
  | "add_to_cart"
  | "purchase"
  | "initiate_checkout"
  | "view_category"
  | "purchase";

export type TGtmEventParameter = {
  event: string;
  event_id?: string;
  timestamp?: number;
  currency?: string;
  value?: number | string;
  order_id?: string;
  content_type?: string;
  contents?: {
    id?: string;
    quantity?: number;
    item_price?: number;
  }[];
  em?: string;
  ph?: string;
};
