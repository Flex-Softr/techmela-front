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
        "mx-auto mt-2 max-w-xl text-center text-sm font-medium leading-relaxed text-muted-foreground md:text-[15px]",
        className
      )}
    >
      {text}
    </p>
  );
};

export default SectionSubtitle;
