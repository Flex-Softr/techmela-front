import { cn } from "@/lib/utils";

const SectionTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span
        aria-hidden
        className="inline-flex h-1 w-10 rounded-full bg-primary/80"
      />
      <h2
        className={cn(
          "text-center text-xl font-bold tracking-tight text-foreground md:text-2xl lg:text-[1.75rem]",
          className
        )}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
