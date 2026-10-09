import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { BadgeCheck, Headset, RotateCcw, Truck } from "lucide-react";

const facilities = [
  {
    icon: <Truck className="size-6 stroke-[1.75]" />,
    title: "Nationwide Safe Delivery",
    description: "Carefully packaged, delivered promptly across Bangladesh.",
  },
  {
    icon: <BadgeCheck className="size-6 stroke-[1.75]" />,
    title: "100% Authentic Quality",
    description: "Guaranteed authentic products with cash on delivery.",
  },
  {
    icon: <Headset className="size-6 stroke-[1.75]" />,
    title: "Dedicated Expert Support",
    description: "Friendly customer care hotline & WhatsApp assistance.",
  },
  {
    icon: <RotateCcw className="size-6 stroke-[1.75]" />,
    title: "Hassle-Free Return Policy",
    description: "Prompt replacement & return guarantee within 3 days.",
  },
];

const Facilities = () => {
  return (
    <section className="py-6 md:py-8 border-y border-border/40 bg-accent/20">
      <ContainerMax>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {facilities.map((item, index) => (
            <div
              key={index}
              className="group p-4 md:p-5 bg-card rounded-2xl shadow-sm border border-border/70 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center"
            >
              <div className="mb-2.5 p-3 rounded-full bg-accent/80 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground mb-1 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </ContainerMax>
    </section>
  );
};

export default Facilities;
