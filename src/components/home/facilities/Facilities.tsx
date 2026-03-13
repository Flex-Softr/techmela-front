import ContainerMax from "@/components/containerMax/ContainerMax";
import { Truck, Banknote, Headphones, RotateCcw } from "lucide-react";

const facilities = [
  {
    icon: <Truck className="w-8 h-8 text-primary" />,
    title: "সারাদেশে হোম ডেলিভারি",
    description: "দেশের যেকোনো প্রান্তে দ্রুত পৌঁছে দেয়া হয়।",
  },
  {
    icon: <Banknote className="w-8 h-8 text-primary" />,
    title: "ক্যাশ অন ডেলিভারি সুবিধা",
    description: "পণ্য হাতে পেয়ে টাকা পরিশোধের সুবিধা।",
  },
  {
    icon: <Headphones className="w-8 h-8 text-primary" />,
    title: "সহজ যোগাযোগ",
    description: "যেকোনো প্রয়োজনে কল করুনঃ ০১৬০২-৪৩১১৬৭",
  },
  {
    icon: <RotateCcw className="w-8 h-8 text-primary" />,
    title: "সহজ রিটার্ন পলিসি",
    description: "৩ দিনের মধ্যে পণ্য পরিবর্তনের নিশ্চয়তা।",
  },
];

const Facilities = () => {
  return (
    <section className="py-4 md:py-6 bg-accent/30">
      <ContainerMax>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facilities.map((item, index) => (
            <div
              key={index}
              className="group p-4 bg-white rounded-xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-2 p-2 bg-primary/5 rounded-full group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
