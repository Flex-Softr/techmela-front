/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "@/redux/features/auth/interface";
import { ProductToClaim } from "@/redux/features/tableData/tableData";
import { TPaymentInfoState } from "./order/paymentInfo";
import { TShippingInfoState } from "./order/shippingInfo";

export type TRootState = {
  couponInfo: {
    couponDiscount: number;
    shippingChange: number;
    cost: number;
  };
  coupon: {
    promoCode: number;
    couponDiscount: number;
    coupon: string;
    cost: number;
    shippingChange: number;
  };
  tableData: ProductToClaim[];
  auth: {
    user: TUser;
  };
  tableDataSlice: ProductToClaim[];
  shippingClass: { _id: string; amount: number };
  shippingInfo: TShippingInfoState;
  paymentInfo: TPaymentInfoState;
};
