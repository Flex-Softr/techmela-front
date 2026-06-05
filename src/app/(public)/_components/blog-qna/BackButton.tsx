"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function BackButton({ className, children }: Props) {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className={className}>
      {children}
    </button>
  );
}
