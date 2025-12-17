import { cn } from "@/lib/utils";

const SectionTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-xl md:text-2xl font-bold font-secondary text-center",
        className
      )}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
