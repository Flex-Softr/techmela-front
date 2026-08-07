"use client";

import CommonModal from "@/components/shared/commonModal/CommonModal";
import {
  ArrowRight,
  CheckCircle,
  PackageCheck,
  ShoppingCart,
  Truck,
  UserCheck,
} from "lucide-react";

type Props = {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange(isOpen: boolean): void;
};

const steps = [
  {
    id: 1,
    title: "Step 1",
    description:
      "Add your preferred product to the cart, then click the cart icon at the top to go to checkout.",
    icon: <ShoppingCart className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Step 2",
    description: "Enter your name, mobile number, and address.",
    icon: <UserCheck className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Step 3",
    description: "Confirm your order.",
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Step 4",
    description: "Our team will process your order.",
    icon: <PackageCheck className="h-6 w-6 text-primary" />,
  },
  {
    id: 5,
    title: "Step 5",
    description: "Your product will be delivered to your address by courier.",
    icon: <Truck className="h-6 w-6 text-primary" />,
  },
];

export default function HowToOrderModal({ isOpen, onOpenChange }: Props) {
  return (
    <CommonModal
      open={isOpen}
      handleOpen={onOpenChange}
      modalTitle="How to order?"
      className="max-w-2xl w-full p-6 rounded-2xl bg-background shadow-2xl max-h-[90vh] overflow-y-auto"
    >
      <div className="flex flex-col gap-6 py-4">
        <p className="text-muted-foreground text-center mb-4">
          Ordering from our website is easy. Just follow the simple steps below:
        </p>

        <div className="space-y-4 sm:space-y-6 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-primary/10 before:hidden md:before:block">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex items-start gap-4 sm:gap-6 group"
            >
              {/* Step Icon Container */}
              <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/20 group-hover:bg-primary/10 transition-colors z-10">
                <span className="sm:scale-100 scale-90">{step.icon}</span>
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-0.5 sm:pt-1 pb-3 sm:pb-4 border-b border-border group-last:border-none">
                <h3 className="text-primary font-black text-base sm:text-lg mb-0.5 sm:mb-1 flex items-center gap-2">
                  {step.title}
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-30 md:hidden" />
                  )}
                </h3>
                <p className="text-foreground/80 font-medium leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
          <p className="text-sm font-bold text-primary">
            For any issues, call us at: 01710020030
          </p>
        </div>
      </div>
    </CommonModal>
  );
}
