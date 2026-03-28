/**
 * Normalize value before hashing (Meta requirement)
 */
const normalize = (value: string): string => {
  return value.trim().toLowerCase();
};

/**
 * SHA-256 hash (hex) - Browser compatible
 */
export const hashUserData = async (
  value?: string | null
): Promise<string | undefined> => {
  if (!value) return undefined;

  const normalized = normalize(value);
  const msgBuffer = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashed = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hashed;
};
