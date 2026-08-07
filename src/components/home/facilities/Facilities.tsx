import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Banknote, Headphones, RotateCcw, Truck } from "lucide-react";

const facilities = [
  {
    icon: <Truck className="w-8 h-8 text-primary" />,
    title: "Nationwide Home Delivery",
    description: "Fast delivery to every corner of the country.",
  },
  {
    icon: <Banknote className="w-8 h-8 text-primary" />,
    title: "Cash on Delivery",
    description: "Pay when you receive your product.",
  },
  {
    icon: <Headphones className="w-8 h-8 text-primary" />,
    title: "Easy Support",
    description: "Call us anytime: 01710020030",
  },
  {
    icon: <RotateCcw className="w-8 h-8 text-primary" />,
    title: "Easy Return Policy",
    description: "Product exchange guaranteed within 3 days.",
  },
];

const Facilities = () => {
  return (
    <section className="py-3 bg-accent/30">
      <ContainerMax>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {facilities.map((item, index) => (
            <div
              key={index}
              className="group p-3 md:p-4 bg-background rounded-xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-1 md:mb-2 p-1.5 md:p-2 bg-primary/5 rounded-full group-hover:scale-110 transition-transform duration-300">
                {/* Scale icon down slightly for mobile */}
                <div className="scale-75 md:scale-100">{item.icon}</div>
              </div>
              <h2 className="text-xs md:text-lg font-bold text-foreground mb-1 md:mb-2 line-clamp-1 md:line-clamp-none">
                {item.title}
              </h2>
              <p className="text-[10px] md:text-sm text-muted-foreground leading-tight md:leading-relaxed line-clamp-2 md:line-clamp-none">
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
