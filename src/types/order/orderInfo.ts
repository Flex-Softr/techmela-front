import { TImage } from "../image";
import { TVariation } from "../products/variableProduct";
import TShippingCharges from "../shippingCharge";

export type TOrderedProducts = {
  productId: string;
  title: string;
  slug: string;
  image: TImage;
  unitPrice: number;
  quantity: number;
  total: number;
  variation?: TVariation;
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
  products?: TOrderedProducts[];
  subtotal: number;
  shippingCharge: TShippingCharges;
  total: number;
  status: string;
  createdAt: string;
  shipping: TShipping;
  payment: TPayment;
};
