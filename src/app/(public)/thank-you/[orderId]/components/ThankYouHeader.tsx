import { CheckCircle } from "lucide-react";
import { getStatusDisplay } from "@/const/orderStatus";

type TThankYouHeaderProps = {
  orderId: string;
  status: string;
};

const ThankYouHeader = ({ orderId, status }: TThankYouHeaderProps) => {
  const statusDisplay = getStatusDisplay(status);

  return (
    <div className="text-center mb-6 space-y-3">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/15 mb-1 lg:mb-3 animate-in zoom-in duration-500">
        <CheckCircle className="w-8 h-8 text-success" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-success sm:text-4xl">
        আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!
      </h1>
      <p className="text-base text-muted-foreground max-w-2xl mx-auto">
        আমাদের সাথে কেনাকাটা করার জন্য ধন্যবাদ! আমরা দ্রুতই আপনার অর্ডারটি প্রসেস করে পৌঁছে দেব।
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
        <span className="whitespace-nowrap text-xl font-bold text-foreground">
          অর্ডার নম্বর #{orderId}
        </span>
        <span
          className={`px-3 py-1 text-sm whitespace-nowrap rounded-full font-semibold border ${statusDisplay.className}`}
        >
          {statusDisplay.banglaLabel}
        </span>
      </div>
    </div>
  );
};

export default ThankYouHeader;
