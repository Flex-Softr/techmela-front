import { cn } from "@/lib/utils";

const SectionSubtitle = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-xs md:text-sm font-semibold text-muted-foreground max-w-xl mx-auto text-center",
        className
      )}
    >
      {text}
    </p>
  );
};

export default SectionSubtitle;
