// import { ReactNode } from "react";

// export type Shipping = {
//   fullAddress: string;
//   fullName: string;
//   phoneNumber: string;
// };
// export type Product = {
//   total: number;
//   status: ReactNode;
//   updatedAt: string | number | Date;
//   shipping: Shipping;
//   phoneNumber: string;
//   warranty: Warranty | null;
//   image: ImageInfo;
//   title: string;
//   unitPrice: number;
//   quantity: number;
//   _id: string;
//   orderId: string;
//   products: ProductItem[];
// };

// export type ProductItem = {
//   _id: string;
//   productId: string;
//   title: string;
//   image: ImageInfo;
//   warranty: Warranty | null;
//   unitPrice: number;
//   quantity: number;
// };

// export type ImageInfo = {
//   src: string;
//   alt: string;
// };

// export type Warranty = {
//   duration: string;
//   startDate: string;
//   endsDate: string;
//   warrantyCodes: { code: string }[];
// };

// Type for the shipping details of the product
export type Shipping = {
  fullAddress: string;
  fullName: string;
  phoneNumber: string;
};

// Type for product image details
export type ImageInfo = {
  src: string;
  alt: string;
};

// Type for warranty details of a product
export type Warranty = {
  duration: { quantity: string; unit: string };
  startDate: string;
  endsDate: string;
  warrantyCodes: { code: string }[]; // List of warranty codes
};

// Type for each product item in the order
export type ProductItem = {
  adjustedQuantity?: number;
  _id: string; // Product ID in order
  productId: string; // Product's unique identifier
  title: string; // Title of the product
  type: string;
  image: ImageInfo; // Product image details
  warranty: Warranty | null; // Warranty details (can be null if no warranty)
  variation?: string;
  attributes?: { [key: string]: string };
  unitPrice: number; // Unit price of the product
  quantity: number; // Quantity of the product in the order
  warrantyClaimHistory?: TWarrantyClaimHistory;
};

export type TWarrantyClaimHistoryClaims = {
  _id: string;
  claimedCodes: string[];
  createdAt: string;
};

export type TWarrantyClaimHistory = {
  _id: string;
  claims: TWarrantyClaimHistoryClaims[];
};

// Type for the order details returned by warranty check
export type Product = {
  _id: string;
  orderId: string;
  shipping: Shipping;
  products: ProductItem[];
};
