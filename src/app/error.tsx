"use client"; // Error components must be Client Components

import { useEffect } from "react";
type TProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function Error({ error, reset }: TProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-[100vh] px-4 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-destructive">দুঃখিত!</h2>
      <h2 className="text-xl md:text-2xl font-semibold text-foreground">
        একটি অপ্রত্যাশিত সমস্যা দেখা দিয়েছে।
      </h2>
      <p className="text-sm text-muted-foreground">
        প্রয়োজনে আমাদের হটলাইনে যোগাযোগ করতে পারেন।
      </p>
      <div className="flex gap-4 mt-2">
        <button
          className="text-primary-foreground py-2 px-6 bg-primary rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
          onClick={() => reset()}
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    </div>
  );
}
