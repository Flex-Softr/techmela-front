import { TImage } from "../image";
import TShippingCharges from "../shippingCharge";

export type TOrderedProducts = {
  product: string;
  unitPrice: number;
  quantity: number;
  total: number;
  variation?: string;
};

type TShipping = {
  _id: string;
  fullAddress: string;
  fullName: string;
  orderId: string;
  phoneNumber: string;
  updatedAt: string;
  createdAt: string;
  __v: string;
};

type TPayment = {
  orderId: string;
  paymentMethod: { _id: string; name: string; image: TImage };
  phoneNumber: string;
  transactionId: string;
  _id: string;
};

export type TOrderInfo = {
  _id: string;
  orderId: string;
  orderedProducts: TOrderedProducts[];
  subtotal: number;
  shippingCharge: TShippingCharges;
  total: number;
  status: string;
  createdAt: string;
  shipping: TShipping;
  payment: TPayment;
};
