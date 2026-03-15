import { useState, useEffect } from "react";

/**
 * Custom hook to create a typing effect for placeholders.
 *
 * @param placeholders Array of strings to cycle through
 * @param typingSpeed Speed of typing in ms
 * @param deletingSpeed Speed of deleting in ms
 * @param delayBetween Delay after typing a full word before deleting starts
 */
const useTypingPlaceholder = (
  placeholders: string[],
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 2500
) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!placeholders || placeholders.length === 0) return;

    const currentPlaceholder = placeholders[index];

    const timeout = setTimeout(
      () => {
        if (!isDeleting && subIndex < currentPlaceholder.length) {
          setSubIndex((prev) => prev + 1);
        } else if (isDeleting && subIndex > 0) {
          setSubIndex((prev) => prev - 1);
        } else if (!isDeleting && subIndex === currentPlaceholder.length) {
          setIsDeleting(true);
        } else if (isDeleting && subIndex === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % placeholders.length);
        }
      },
      isDeleting
        ? deletingSpeed
        : subIndex === currentPlaceholder.length
          ? delayBetween
          : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    subIndex,
    isDeleting,
    index,
    placeholders,
    typingSpeed,
    deletingSpeed,
    delayBetween,
  ]);

  return placeholders[index]?.substring(0, subIndex) || "";
};

export default useTypingPlaceholder;
