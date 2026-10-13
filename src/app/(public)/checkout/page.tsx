import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import CheckoutForm from "./components/CheckoutForm";
import PaymentMethodsFetcher from "./components/PaymentMethodsFetcher";
import SelectShippingAreaFetcher from "./components/SelectShippingAreaFetcher";
import { ShieldCheck, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "চেকআউট | TechMela",
  description: "সহজ ডেলিভারি এবং সম্পূর্ণ নিরাপদ পেমেন্টে আপনার অর্ডার সম্পন্ন করুন",
};

const Checkout = async () => {
  return (
    <div className="bg-[#f8fafc] border-b border-slate-200/60 py-6 sm:py-10 min-h-[calc(100vh-220px)]">
      <ContainerMax className="px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="pt-2 sm:pt-4 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
              <ShoppingBag className="size-3.5" />
              <span>সহজ ও দ্রুত চেকআউট</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              অর্ডার সম্পন্ন করুন
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              অর্ডারটি সম্পন্ন করতে আপনার ডেলিভারির তথ্য দিন।
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-white border border-slate-200/80 px-3.5 py-2 rounded-xl shadow-xs text-xs text-slate-600 font-medium">
            <ShieldCheck className="size-4 text-primary shrink-0" />
            <span>১০০% নিরাপদ ও সুরক্ষিত চেকআউট</span>
          </div>
        </div>

        <CheckoutForm
          shippingAreaSlot={<SelectShippingAreaFetcher />}
          paymentMethodsDesktopSlot={
            <PaymentMethodsFetcher idPrefix="desktop-payment" />
          }
          paymentMethodsMobileSlot={
            <PaymentMethodsFetcher idPrefix="mobile-payment" />
          }
        />
      </ContainerMax>
    </div>
  );
};

export default Checkout;
