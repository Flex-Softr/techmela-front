export type TShippingInfo = {
  fullName: string;
  phoneNumber: string;
  email?: string;
  division: string; // state id
  district: string; // city
  upazila: string; // upazila id
  fullAddress: string;
  notes?: string;
};

export type TShippingInfoState = {
  data: null | TShippingInfo;
  errors: string[] | null;
};
