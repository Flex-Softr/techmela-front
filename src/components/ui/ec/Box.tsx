import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Box = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "rounded-xl border border-border bg-card p-5 text-card-foreground shadow-none",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
