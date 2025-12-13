/* eslint-disable @typescript-eslint/no-explicit-any */
export type TGtmEvents =
  | "view_content"
  | "add_to_cart"
  | "purchase"
  | "initiate_checkout"
  | "view_category";

export type TGtmEventParameter = {
  content_name?: string; // Example: "Product Name"
  content_category?: string; // Example: "Electronics"
  content_type?:
    | "product"
    | "service"
    | "product_group"
    | "home_listing"
    | "hotel"
    | string; // Predefined values like "product" or "service"
  content_ids?: string[]; // Example: ["123", "456"]
  contents?: Record<string, any>[]; // Array of objects for detailed content info
  value?: number; // Example: 99.99
  currency?: string; // Example: "USD"
  num_items?: number; // Example: 3
  search_string?: string; // Example: "Search Query"
  status?: string; // Example: "completed"
  predicted_ltv?: number; // Example: 150.0

  // Customer Information Parameters
  em?: string; // Email: "user@example.com"
  ph?: string; // Phone: "+1234567890"
  fn?: string; // First Name: "John"
  ln?: string; // Last Name: "Doe"
  db?: string; // Date of Birth: "1990-01-01"
  ge?: "male" | "female" | "not_set"; // Gender: "male"
  ct?: string; // City: "New York"
  st?: string; // State: "NY"
  zp?: string; // Zip Code: "10001"
  country?: string; // Example: "US"
  external_id?: string; // Unique identifier for the user

  [key: string]: any; // To support additional custom properties
};
