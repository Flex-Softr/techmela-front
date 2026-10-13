/** Bangladeshi mobile number: 01XXXXXXXXX (optionally prefixed with +88). */
export const BD_PHONE_REGEX = /^(?:\+88)?01[3-9]\d{8}$/;

export const isValidBdPhone = (phone?: string | null): boolean =>
  !!phone && BD_PHONE_REGEX.test(phone.trim());
