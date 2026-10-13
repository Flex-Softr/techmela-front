"use client";

import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
import { Button } from "@/components/ui/button";
import { SITE } from "@/const/site.const";
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
        <div>
          <CustomerDetails orderInfo={orderInfo} />
        </div>
      </div>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[30vh] gap-4">
      <ErrorMessage
        className="text-center py-3 block text-destructive font-medium"
        message="আপনার অর্ডারের তথ্য খুঁজে পাওয়া যায়নি। সম্ভবত অর্ডার আইডিটি সঠিক নয় অথবা তথ্যটি মুছে ফেলা হয়েছে।"
      />
    </div>
  );

  return (
    <div className="pt-6 pb-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6">
      {content}

      {/* Social Media Links Section */}
      <div className="mt-12 pt-8 border-t border-border flex flex-col items-center gap-6">
        <div className="text-center">
          <h3 className="text-lg font-bold text-foreground">
            আমাদের সাথে যুক্ত থাকুন
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            নতুন অফার ও সর্বশেষ আপডেটের জন্য আমাদের সোশ্যাল মিডিয়ায় ফলো করুন
          </p>
        </div>

        <div className="flex gap-4 sm:gap-6">
          <a
            href={SITE.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/5 p-3 rounded-full text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
            title="ফেসবুক পেজ"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/5 p-3 rounded-full text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
            title="কমিউনিটি গ্রুপ"
          >
            <FaUsers size={24} />
          </a>
          <a
            href={`https://wa.me/${SITE.phone.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/5 p-3 rounded-full text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
            title="হোয়াটসঅ্যাপ"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href={SITE.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/5 p-3 rounded-full text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
            title="ইউটিউব চ্যানেল"
          >
            <FaYoutube size={24} />
          </a>
        </div>

        <Button asChild className="mt-4">
          <Link href="/">হোম পেজে ফিরে যান</Link>
        </Button>
      </div>
    </div>
  );
};

export default ThankYouCard;
