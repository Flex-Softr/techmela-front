import { TPaymentMethod } from "../paymentMethod";

export type TPaymentInfo = {
  selectedPaymentMethod: TPaymentMethod;
  paymentDetails?: Record<string, string | number>;
};

export type TPaymentInfoState = {
  data: null | TPaymentInfo;
  errors: string[] | null;
};
