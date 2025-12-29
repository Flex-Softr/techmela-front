import { TImage } from "./image";

export type TPaymentMethodMerchantACInfo = {
  accountType: string;
  accountNo: string;
};

export type TPaymentMethodRequiredInput = {
  type: "text" | "number" | "select";
  name: string;
  is_required: boolean;
  enums?: string; // Comma separated string
};

export type TPaymentMethod = {
  _id: string;
  name: string;
  image: TImage;
  description: string;
  instructions?: string;
  merchantACInfo?: TPaymentMethodMerchantACInfo;
  isPaymentDetailsNeeded: boolean;
  required_inputs?: TPaymentMethodRequiredInput[];
};
