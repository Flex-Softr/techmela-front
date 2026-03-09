"use client";

import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import { Button } from "@/components/ui/button";
import { useSingleOrderQuery } from "@/redux/features/order/orderApi";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaUsers, FaWhatsapp, FaYoutube } from "react-icons/fa";
import CustomerDetails from "./CustomerDetails";
import OrderSummary from "./OrderSummary";
import ThankYouHeader from "./ThankYouHeader";

const ThankYouCard = ({ orderId }: { orderId?: string }) => {
  const { data, isLoading } = useSingleOrderQuery({ id: orderId });
  const orderInfo = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const content = orderInfo ? (
    <>
      <ThankYouHeader orderId={orderInfo.orderId} status={orderInfo.status} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <OrderSummary orderInfo={orderInfo} />
        </div>
        <div className="">
          <CustomerDetails orderInfo={orderInfo} />
        </div>
      </div>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[30vh] gap-4">
      <ErrorMessage
        className="text-center py-3 block text-red-500 font-medium"
        message="We couldn't locate the order details you're looking for. It's possible the order ID is incorrect or the order has been removed."
      />
    </div>
  );

  return (
    <div className="pt-6 pb-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6">
      {content}

      {/* Social Media Links Section */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center gap-6">
        <div className="text-center">
          <h3 className="text-lg font-bold text-foreground">
            আমাদের সাথে যুক্ত থাকুন
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            সবশেষ আপডেট এবং অফার পেতে আমাদের সোশ্যাল মিডিয়ায় যুক্ত হন
          </p>
        </div>

        <div className="flex gap-4 sm:gap-6">
          <a
            href="https://www.facebook.com/siddikiyaprokashoni"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/5 p-3 rounded-full text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            title="Facebook Page"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://www.facebook.com/groups/548576081614946"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/5 p-3 rounded-full text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            title="Facebook Group"
          >
            <FaUsers size={24} />
          </a>
          <a
            href="http://wa.me/8801602431167"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/5 p-3 rounded-full text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            title="WhatsApp"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="https://youtube.com/@dmkbofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/5 p-3 rounded-full text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            title="YouTube"
          >
            <FaYoutube size={24} />
          </a>
        </div>

        <Button asChild variant="outline" className="mt-4">
          <Link href="/">হোম পেজে ফিরে যান</Link>
        </Button>
      </div>
    </div>
  );
};

export default ThankYouCard;
