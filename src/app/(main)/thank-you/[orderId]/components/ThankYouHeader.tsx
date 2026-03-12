import { CheckCircle } from "lucide-react";

type TThankYouHeaderProps = {
  orderId: string;
  status: string;
};

const ThankYouHeader = ({ orderId, status }: TThankYouHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "confirmed":
        return "bg-green-600 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      case "delivered":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="text-center mb-6 space-y-3">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-1 lg:mb-3 animate-in zoom-in duration-500">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-green-600 sm:text-4xl">
        আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে।
      </h1>
      <p className="text-base text-gray-600 max-w-2xl mx-auto">
        অর্ডারটি নিশ্চিত করার জন্য ধন্যবাদ! আমরা অর্ডারটি প্রক্রিয়া করছি এবং
        শীঘ্রই নিশ্চিত করব।
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
        <span className="whitespace-nowrap text-xl font-bold text-gray-800">
          অর্ডার #{orderId}
        </span>
        <span
          className={`px-3 py-1 text-sm capitalize whitespace-nowrap rounded-full font-medium ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default ThankYouHeader;
