import { TImage } from "../image";
import TShippingCharges from "../shippingCharge";

export type TOrderedProducts = {
  product: string;
  productId: string;
  title: string;
  slug: string;
  image: TImage;
  unitPrice: number;
  quantity: number;
  total: number;
  variation?: string;
};

type TShipping = {
  fullAddress: string;
  fullName: string;
  phoneNumber: string;
};

type TPayment = {
  paymentMethod: { _id: string; name: string; image: TImage };
  phoneNumber: string;
  transactionId: string;
};

export type TOrderInfo = {
  _id: string;
  orderId: string;
  orderedProducts: TOrderedProducts[];
  products?: TOrderedProducts[];
  subtotal: number;
  total: number;
  discount: number;
  couponDiscount: number;
  advance: number;
  shippingCharge: TShippingCharges;
  status: string;
  createdAt: string;
  shipping: TShipping;
  payment: TPayment;
};
