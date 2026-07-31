import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SectionTitle = ({
  title,
  href,
  linkText,
  className,
}: {
  title: string;
  href?: string;
  linkText?: string;
  className?: string;
}) => {
  return (
    <div className={cn("px-2", className)}>
      <div
        className={cn(
          "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
          !href && "sm:justify-start"
        )}
      >
        <div className="min-w-0 space-y-2">
          <span
            aria-hidden
            className="inline-flex h-1 w-10 rounded-full bg-primary/80"
          />
          <h2 className="truncate text-lg font-bold tracking-tight text-foreground md:text-xl">
            {title}
          </h2>
        </div>

        {href ? (
          <Link
            href={href}
            className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:self-auto"
          >
            {linkText ?? "See all"}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : null}
      </div>
      <div className="mt-3 h-px w-full bg-gradient-to-r from-primary/30 via-border to-transparent" />
    </div>
  );
};

export default SectionTitle;
