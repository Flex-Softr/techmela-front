/**
 * Utility helper to convert Arabic/English numbers to Bengali numerals
 */
export const bengali = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bengaliDigits[Number(d)]);
};

export const toBengaliDigits = bengali;
